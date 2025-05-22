from db_conexao import conectar

def listar_subseccionais():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Descricao FROM Subseccional
        WHERE Status = 'A'
    """)
    
    resultados = cursor.fetchall()
    conn.close()

    return [{"id": row[0], "descricao": row[1]} for row in resultados]

def criar_subseccional(descricao, id_usuario):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Subseccional (Id, Descricao, Id_usuario, Status)
        VALUES ((SELECT ISNULL(MAX(Id), 0) + 1 FROM Subseccional), ?, ?, 'A')
    """, (descricao, id_usuario))

    conn.commit()
    conn.close()

def atualizar_subseccional(id, nova_descricao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Subseccional
        SET Descricao = ?
        WHERE Id = ?
    """, (nova_descricao, id))

    conn.commit()
    conn.close()

def inativar_subseccional(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Subseccional
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
