from db_conexao import conectar
import pyodbc

def test_conectar():
    conn = conectar()
    assert conn is not None, "A conexão não deve ser None."

    assert isinstance(conn, pyodbc.Connection), "O tipo de conexão deve ser pyodbc.Connection."

    conn.close()

if __name__ == "__main__":
    test_conectar()
    print("Teste de conexão concluído com sucesso.")

