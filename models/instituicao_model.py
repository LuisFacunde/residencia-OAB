from db_conexao import conectar

def listar_instituicoes():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Descricao FROM Instituicao WHERE Status = 'A'
    """)
    
    resultados = cursor.fetchall()
    conn.close()

    return [{"id": row[0], "descricao": row[1]} for row in resultados]

def criar_instituicao(descricao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Instituicao (Descricao, Status)
        VALUES (?, 'A')
    """, (descricao,))

    conn.commit()
    conn.close()

def inativar_instituicao(id_instituicao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Instituicao
        SET Status = 'I'
        WHERE Id = ?
    """, (id_instituicao,))

    conn.commit()
    conn.close()
