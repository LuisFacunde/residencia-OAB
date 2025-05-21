import bcrypt
from db_conexao import conectar

def autenticar_usuario(NomeUsuario, senha):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT U.Id, U.Nome, U.Email, U.Senha, P.Nome as Perfil, P.NomeUsuario
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

def cadastrar_usuario(nome, email, senha, id_perfil):
    conn = conectar()
    cursor = conn.cursor()

    nome_usuario = gerar_nome_usuario(nome)
    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    cursor.execute("""
        INSERT INTO Usuarios (Nome, NomeUsuario, Email, Senha, Id_Perfil, Status)
        VALUES (?, ?, ?, ?, ?, 'A')
    """, (nome, nome_usuario, email, senha_hash, id_perfil))

    conn.commit()
    conn.close()
    
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

    cursor.execute("""
        SELECT Email FROM Usuarios WHERE Email = ?
    """, (email,))
    
    row = cursor.fetchone()
    conn.close()

    return row is not None
    
def atualizar_usuario(email, novo_nome, nova_senha, novo_perfil):
    conn = conectar()
    cursor = conn.cursor()

    senha_hash = bcrypt.hashpw(nova_senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    cursor.execute("""
        UPDATE Usuarios
        SET Nome = ?, Senha = ?, Id_Perfil = ?
        WHERE Email = ?
    """, (novo_nome, senha_hash, novo_perfil, email))

    conn.commit()
    conn.close()
    
def desativar_usuario(email):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Usuarios SET Status = 'I' WHERE Email = ?
    """, (email,))

    conn.commit()
    conn.close()
