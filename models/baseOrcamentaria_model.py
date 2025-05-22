from db_conexao import conectar

def listar_lancamentos():
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT Id, Id_Lancto, Lancto, Valor, DtDocto, DtLancto, Ano, Tipo
        FROM BaseOrcamentaria
        WHERE Status = 'A'
    """)

    resultados = cursor.fetchall()
    conn.close()

    return [{
        "id": row[0],
        "id_lancto": row[1],
        "lancto": row[2],
        "valor": float(row[3]),
        "dt_docto": row[4],
        "dt_lancto": row[5],
        "ano": row[6],
        "tipo": row[7]
    } for row in resultados]


def criar_lancamento(id_lancto, lancto, valor, dt_docto, dt_lancto, ano, tipo):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO BaseOrcamentaria (
            Id_Lancto, Lancto, Valor, DtDocto, DtLancto, Ano, Tipo, Status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'A')
    """, (id_lancto, lancto, valor, dt_docto, dt_lancto, ano, tipo))

    conn.commit()
    conn.close()


def atualizar_lancamento(id, lancto, valor, dt_docto, dt_lancto, ano, tipo):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE BaseOrcamentaria
        SET Lancto = ?, Valor = ?, DtDocto = ?, DtLancto = ?, Ano = ?, Tipo = ?
        WHERE Id = ?
    """, (lancto, valor, dt_docto, dt_lancto, ano, tipo, id))

    conn.commit()
    conn.close()


def inativar_lancamento(id):
    conn = conectar()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE BaseOrcamentaria
        SET Status = 'I'
        WHERE Id = ?
    """, (id,))

    conn.commit()
    conn.close()
