from db_conexao import conectar

def listar_prestacoes():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT P.Id, S.Descricao, P.MesRef, P.AnoRef, P.DtPrevEntr,
               P.DtEntrega, P.DtPagto, P.ValorPago, P.Eficiencia, P.Observacao
        FROM PrestacaoContasSubseccional P
        INNER JOIN Subseccional S ON S.Id = P.Id_Subseccional
        WHERE P.Status = 'A'
    """)

    resultados = cursor.fetchall()
    conn.close()

    return [{
        "id": row[0],
        "subseccional": row[1],
        "mes_ref": row[2],
        "ano_ref": row[3],
        "dt_prev_entr": row[4],
        "dt_entrega": row[5],
        "dt_pagto": row[6],
        "valor_pago": float(row[7]),
        "eficiencia": row[8],
        "observacao": row[9]
    } for row in resultados]


def criar_prestacao(id_subseccional, mes_ref, ano_ref, dt_prev_entr,
                    dt_entrega, dt_pagto, valor_pago, eficiencia, observacao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO PrestacaoContasSubseccional (
            Id_Subseccional, MesRef, AnoRef, DtPrevEntr, DtEntrega,
            DtPagto, ValorPago, Eficiencia, Observacao, Status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'A')
    """, (id_subseccional, mes_ref, ano_ref, dt_prev_entr, dt_entrega,
          dt_pagto, valor_pago, eficiencia, observacao))

    conn.commit()
    conn.close()


def atualizar_prestacao(id, mes_ref, ano_ref, dt_prev_entr, dt_entrega,
                        dt_pagto, valor_pago, eficiencia, observacao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE PrestacaoContasSubseccional
        SET MesRef = ?, AnoRef = ?, DtPrevEntr = ?, DtEntrega = ?, DtPagto = ?,
            ValorPago = ?, Eficiencia = ?, Observacao = ?
        WHERE Id = ?
    """, (mes_ref, ano_ref, dt_prev_entr, dt_entrega, dt_pagto,
          valor_pago, eficiencia, observacao, id))

    conn.commit()
    conn.close()


def inativar_prestacao(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE PrestacaoContasSubseccional
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
