from db_conexao import conectar

def criar_perfil(nome, permissoes):
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
