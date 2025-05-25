import bcrypt
from db_conexao import conectar

def autenticar_usuario(NomeUsuario, senha):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT U.Id, U.Nome, U.Email, U.Senha, P.Nome as Perfil
        FROM Usuarios U
        INNER JOIN Perfis P ON P.Id = U.Id_Perfil
        WHERE U.NomeUsuario = ?
    """, (NomeUsuario,))
    
    row = cursor.fetchone()
    conn.close()

    if row:
        id_usuario, nome, email_db, senha_hash, perfil = row
        if bcrypt.checkpw(senha.encode('utf-8'), senha_hash.encode('utf-8')):
            return {
                "id": id_usuario,
                "nome": nome,
                "email": email_db,
                "perfil": perfil
            }

    return None

def gerar_nome_usuario(nome_completo):
    partes = nome_completo.strip().split()
    if len(partes) < 2:
        return partes[0].capitalize()
    primeiro = partes[0].capitalize()
    ultimo = partes[-1].capitalize()
    return f"{primeiro}.{ultimo}"

def verificar_email_existente(email):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT Email FROM Usuarios WHERE Email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    return row is not None

def obter_ou_criar_perfil(nome_perfil):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT Id FROM Perfis WHERE Nome = ?", (nome_perfil,))
    row = cursor.fetchone()
    if row:
        perfil_id = row[0]
    else:
        cursor.execute("INSERT INTO Perfis (Nome) VALUES (?)", (nome_perfil,))
        conn.commit()
        perfil_id = cursor.lastrowid
    conn.close()
    return perfil_id

def obter_ou_criar_modulo(nome_modulo):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT Id FROM Modulos WHERE Nome = ?", (nome_modulo,))
    row = cursor.fetchone()
    if row:
        modulo_id = row[0]
    else:
        cursor.execute("INSERT INTO Modulos (Nome) VALUES (?)", (nome_modulo,))
        conn.commit()
        modulo_id = cursor.lastrowid
    conn.close()
    return modulo_id

def cadastrar_usuario_com_permissoes(nome, email, senha, nome_perfil, permissoes, setor=None, cargo=None):
    if verificar_email_existente(email):
        return {"erro": "E-mail já cadastrado."}
    
    nome_usuario = gerar_nome_usuario(nome)
    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    perfil_id = obter_ou_criar_perfil(nome_perfil)

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Usuarios (Nome, NomeUsuario, Email, Senha, Setor, Cargo, Id_Perfil, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'A')
    """, (nome, nome_usuario, email, senha_hash, setor, cargo, perfil_id))
    conn.commit()

    for p in permissoes:
        nome_modulo = p.get("modulo")
        p_create = int(p.get("create", 0))
        p_read   = int(p.get("read", 0))
        p_update = int(p.get("update", 0))
        p_delete = int(p.get("delete", 0))

        modulo_id = obter_ou_criar_modulo(nome_modulo)

        cursor.execute("""
            SELECT 1 FROM Permissoes WHERE Id_Perfil = ? AND Id_Modulo = ?
        """, (perfil_id, modulo_id))
        if cursor.fetchone() is None:
            cursor.execute("""
                INSERT INTO Permissoes (Id_Perfil, Id_Modulo, P_Create, P_Read, P_Update, P_Delete)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (perfil_id, modulo_id, p_create, p_read, p_update, p_delete))

    conn.commit()
    conn.close()
    return {"sucesso": "Usuário cadastrado com sucesso."}
