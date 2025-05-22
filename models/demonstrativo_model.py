from db_conexao import conectar

def listar_demonstrativos():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Descricao FROM Demonstrativo
        WHERE Status = 'A'
    """)
    
    resultados = cursor.fetchall()
    conn.close()

    return [{"id": row[0], "descricao": row[1]} for row in resultados]

def criar_demonstrativo(descricao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Demonstrativo (Descricao, Status)
        VALUES (?, 'A')
    """, (descricao,))

    conn.commit()
    conn.close()

def atualizar_demonstrativo(id, nova_descricao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Demonstrativo
        SET Descricao = ?
        WHERE Id = ?
    """, (nova_descricao, id))

    conn.commit()
    conn.close()

def inativar_demonstrativo(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Demonstrativo
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
