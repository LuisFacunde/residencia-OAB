from db_conexao import conectar
try:
    conn = conectar()
    if conn:
        cursor = conn.cursor()

        print("Inserindo em TipoDesconto...")
        cursor.execute("INSERT INTO TipoDesconto (Nome) VALUES (?)", ("Desconto Ordinário",))
        cursor.execute("INSERT INTO TipoDesconto (Nome) VALUES (?)", ("Desconto Extraordinário",))

        print("Inserindo em Subseccional...")
        cursor.execute("INSERT INTO Subseccional (Id, SubSeccional, Id_usuario) VALUES (?, ?, ?)",
                       (1, "Subseção Centro", 1001))

        print("Inserindo em Transparencia...")
        cursor.execute(""" 
            INSERT INTO Transparencia (Demonstracao, Referencia, Ano, Periodicidade, DtPrevEntr, DtEntrega, Id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, ("DRE 2023", "01/2023", "2023", "Mensal", "2023-02-01", "2023-02-10", 1001))

        print("Inserindo em BalanceteCFOAB...")
        cursor.execute(""" 
            INSERT INTO BalanceteCFOAB (Demonstracao, Referencia, Ano, Periodicidade, DtPrevEntr, DtEntrega, Id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, ("Balancete Fev", "02/2023", "2023", "Mensal", "2023-03-01", "2023-03-08", 1001))

        print("Inserindo em PagamentoCotas...")
        cursor.execute(""" 
            INSERT INTO PagamentoCotas (Instituicao, MesReferencia, Ano, ValorDevido, DtPrevEntr, ValorPago, DtPagto, Observacao, Id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, ("Instituição X", "03/2023", "2023", 15000.00, "2023-04-01", 15000.00, "2023-04-10", "Pagamento integral", 1001))

        print("Inserindo em PrestacaoContasSubseccional...")
        cursor.execute(""" 
            INSERT INTO PrestacaoContasSubseccional (
                Id_Subseccional, MesReferencia, Ano, DtPrevEntr, DtEntrega, DtPagto,
                ValorDesconto, ValorDuodecimo, Observacao, Status, ProtocoloSGD, Id_TipoDesconto, Id_usuario
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            1, "03/2023", "2023", "2023-04-01", "2023-04-10", "2023-04-10",
            500.00, 10000.00, "Pagamento com desconto", "A", "SGD2023-001", 1, 1001
        ))

        conn.commit()
        print("Todos os dados foram inseridos com sucesso!")
    else:
        print("Conexão falhou.")
except Exception as e:
    print(f"Erro ao inserir dados: {e}")
finally:
    if 'conn' in locals() and conn:
        conn.close()
        print("Conexão encerrada.")
