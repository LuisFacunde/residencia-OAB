from db_conexao import conectar

def criar_perfil_db(nome, permissoes):
    conn = conectar()
    cursor = conn.cursor()

    try:
        # Verifica se perfil existe
        cursor.execute("SELECT Id FROM Perfis WHERE Nome = ?", (nome,))
        if cursor.fetchone():
            return {"erro": "Perfil já existe."}

        # Insere o perfil e obtém o ID (SQL Server)
        cursor.execute("""
            INSERT INTO Perfis (Nome) 
            OUTPUT INSERTED.Id
            VALUES (?)
        """, (nome,))
        perfil_id = cursor.fetchone()[0]

        # Insere as permissões
        for p in permissoes:
            cursor.execute("""
                INSERT INTO Permissoes 
                (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                perfil_id,
                p.get("modulo"),
                int(p.get("create", 0)),
                int(p.get("read", 0)),
                int(p.get("update", 0)),
                int(p.get("delete", 0))
            ))

        conn.commit()
        return {"mensagem": "Perfil criado com sucesso.", "id": perfil_id}
    except Exception as e:
        conn.rollback()
        print(f"Erro ao criar perfil: {str(e)}")
        return {"erro": f"Erro ao criar perfil: {str(e)}"}
    finally:
        conn.close()

def listar_perfis():
    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT Id, Nome FROM Perfis")
        perfis = cursor.fetchall()

        perfil_list = []
        for perfil in perfis:
            perfil_id, nome = perfil
            cursor.execute("""
                SELECT Modulo, P_Create, P_Read, P_Update, P_Delete 
                FROM Permissoes 
                WHERE Id_Perfil = ?
            """, (perfil_id,))
            permissoes = cursor.fetchall()
            
            permissoes_list = [{
                "modulo": p[0], 
                "create": bool(p[1]), 
                "read": bool(p[2]), 
                "update": bool(p[3]), 
                "delete": bool(p[4])
            } for p in permissoes]
            
            perfil_list.append({
                "id": perfil_id, 
                "nome": nome, 
                "permissoes": permissoes_list
            })

        return perfil_list
    except Exception as e:
        print(f"Erro ao listar perfis: {str(e)}")
        raise
    finally:
        conn.close()
