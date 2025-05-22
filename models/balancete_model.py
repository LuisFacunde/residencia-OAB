from db_conexao import conectar

def listar_balancetes():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT B.Id, D.Descricao, B.Referencia, B.Ano, B.Periodicidade,
               B.DtPrevEntr, B.DtEntrega, B.Eficiencia
        FROM BalanceteCFOAB B
        INNER JOIN Demonstrativo D ON D.Id = B.Id_Demonst
        WHERE B.Status = 'A'
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
        "dt_entrega": row[6],
        "eficiencia": row[7]
    } for row in resultados]


def criar_balancete(id_demonst, referencia, ano, periodicidade, dt_prev_entr, dt_entrega, eficiencia):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO BalanceteCFOAB (Id_Demonst, Referencia, Ano, Periodicidade,
                                    DtPrevEntr, DtEntrega, Eficiencia, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'A')
    """, (id_demonst, referencia, ano, periodicidade, dt_prev_entr, dt_entrega, eficiencia))

    conn.commit()
    conn.close()


def atualizar_balancete(id, referencia, ano, periodicidade, dt_prev_entr, dt_entrega, eficiencia):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE BalanceteCFOAB
        SET Referencia = ?, Ano = ?, Periodicidade = ?, DtPrevEntr = ?,
            DtEntrega = ?, Eficiencia = ?
        WHERE Id = ?
    """, (referencia, ano, periodicidade, dt_prev_entr, dt_entrega, eficiencia, id))

    conn.commit()
    conn.close()


def inativar_balancete(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE BalanceteCFOAB
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
