from db_conexao import conectar

def criar_perfil_db(nome, permissoes):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT Id FROM Perfis WHERE Nome = ?", (nome,))
    if cursor.fetchone():
        conn.close()
        return {"erro": "Perfil já existe."}

    cursor.execute("INSERT INTO Perfis (Nome) VALUES (?)", (nome,))
    perfil_id = cursor.lastrowid

    for p in permissoes:
        modulo = p.get("modulo")
        p_create = int(p.get("create", 0))
        p_read   = int(p.get("read", 0))
        p_update = int(p.get("update", 0))
        p_delete = int(p.get("delete", 0))

        cursor.execute("""
            INSERT INTO Permissoes (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (perfil_id, modulo, p_create, p_read, p_update, p_delete))

    conn.commit()
    conn.close()
    return {"mensagem": "Perfil criado com sucesso."}

def listar_perfis():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("SELECT Id, Nome FROM Perfis")
    perfis = cursor.fetchall()

    perfil_list = []
    for perfil in perfis:
        perfil_id, nome = perfil
        cursor.execute("SELECT Modulo, P_Create, P_Read, P_Update, P_Delete FROM Permissoes WHERE Id_Perfil = ?", (perfil_id,))
        permissoes = cursor.fetchall()
        permissoes_list = [{"modulo": p[0], "create": p[1], "read": p[2], "update": p[3], "delete": p[4]} for p in permissoes]
        perfil_list.append({"id": perfil_id, "nome": nome, "permissoes": permissoes_list})

    conn.close()
    return perfil_list
