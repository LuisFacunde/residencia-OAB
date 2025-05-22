from db_conexao import conectar

def listar_pagamentos():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT P.Id, I.Descricao, P.MesRef, P.AnoRef, P.DtPrevEntr,
               P.ValorDuodecimo, P.ValorDesconto, P.ValorPago,
               P.DtPagto, P.Observacao
        FROM PagamentoCotas P
        INNER JOIN Instituicao I ON I.Id = P.Id_Instit
        WHERE P.Status = 'A'
    """)

    resultados = cursor.fetchall()
    conn.close()

    return [{
        "id": row[0],
        "instituicao": row[1],
        "mes_ref": row[2],
        "ano_ref": row[3],
        "dt_prev_entr": row[4],
        "valor_duodecimo": float(row[5]),
        "valor_desconto": float(row[6]),
        "valor_pago": float(row[7]),
        "dt_pagto": row[8],
        "observacao": row[9]
    } for row in resultados]


def criar_pagamento(id_instit, mes_ref, ano_ref, dt_prev_entr, valor_duodecimo,
                    valor_desconto, id_tpdesc, valor_pago, dt_pagto, observacao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO PagamentoCotas (
            Id_Instit, MesRef, AnoRef, DtPrevEntr, ValorDuodecimo,
            ValorDesconto, Id_TpDesc, ValorPago, DtPagto, Observacao, Status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A')
    """, (id_instit, mes_ref, ano_ref, dt_prev_entr, valor_duodecimo,
          valor_desconto, id_tpdesc, valor_pago, dt_pagto, observacao))

    conn.commit()
    conn.close()


def atualizar_pagamento(id, mes_ref, ano_ref, dt_prev_entr, valor_duodecimo,
                        valor_desconto, id_tpdesc, valor_pago, dt_pagto, observacao):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE PagamentoCotas
        SET MesRef = ?, AnoRef = ?, DtPrevEntr = ?, ValorDuodecimo = ?,
            ValorDesconto = ?, Id_TpDesc = ?, ValorPago = ?, DtPagto = ?, Observacao = ?
        WHERE Id = ?
    """, (mes_ref, ano_ref, dt_prev_entr, valor_duodecimo,
          valor_desconto, id_tpdesc, valor_pago, dt_pagto, observacao, id))

    conn.commit()
    conn.close()


def inativar_pagamento(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE PagamentoCotas
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
