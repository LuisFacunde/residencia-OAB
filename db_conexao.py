import pyodbc

def conectar():
    try:
        conn = pyodbc.connect(
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=localhost;'  # Ou o endereço do servidor
            'DATABASE=DM_TI_FINANCEIRO;'  # Nome do banco de dados
            'Trusted_Connection=yes;'  # Usando autenticação do Windows
        )
        print("Conexão estabelecida com sucesso.")
        return conn
    except pyodbc.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None