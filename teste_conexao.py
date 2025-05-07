from db_conexao import conectar
import pyodbc

def test_conectar():
    """
    Testa a função de conexão ao banco de dados SQL Server.
    """
    conn = conectar()
    assert conn is not None, "A conexão não deve ser None."

    # Verifica se o tipo de conexão é pyodbc.Connection
    assert isinstance(conn, pyodbc.Connection), "O tipo de conexão deve ser pyodbc.Connection."

    # Fecha a conexão após o teste
    conn.close()

if __name__ == "__main__":
    test_conectar()
    print("Teste de conexão concluído com sucesso.")

