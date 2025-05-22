from db_conexao import conectar

def listar_transparencias():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT T.Id, D.Descricao, T.Referencia, T.Ano, T.Periodicidade, T.DtPrevEntr, T.DtEntrega
        FROM Transparencia T
        INNER JOIN Demonstrativo D ON D.Id = T.Id_Demonst
        WHERE T.Status = 'A'
    """)

    resultados = cursor.fetchall()
    conn.close()

    return [{
        "id": row[0],
        "demonstrativo": row[1],
        "referencia": row[2],
        "ano": row[3],
        "periodicidade": row[4],
        "dt_prev_entr": row[5],
        "dt_entrega": row[6]
    } for row in resultados]


def criar_transparencia(id_demonst, referencia, ano, periodicidade, dt_prev_entr, dt_entrega):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Transparencia (Id_Demonst, Referencia, Ano, Periodicidade, DtPrevEntr, DtEntrega, Status)
        VALUES (?, ?, ?, ?, ?, ?, 'A')
    """, (id_demonst, referencia, ano, periodicidade, dt_prev_entr, dt_entrega))

    conn.commit()
    conn.close()


def atualizar_transparencia(id, referencia, ano, periodicidade, dt_prev_entr, dt_entrega):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Transparencia
        SET Referencia = ?, Ano = ?, Periodicidade = ?, DtPrevEntr = ?, DtEntrega = ?
        WHERE Id = ?
    """, (referencia, ano, periodicidade, dt_prev_entr, dt_entrega, id))

    conn.commit()
    conn.close()


def inativar_transparencia(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Transparencia
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
