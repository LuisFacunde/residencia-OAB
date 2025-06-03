import pandas as pd
from db_conexao import conectar

def importar_arquivo_para_tabela(nome_tabela, arquivo):
    try:
        if arquivo.filename.endswith('.csv'):
            df = pd.read_csv(arquivo)
        elif arquivo.filename.endswith('.xlsx'):
            df = pd.read_excel(arquivo)
        else:
            return {"erro": "Formato de arquivo não suportado"}

        conn = conectar()
        cursor = conn.cursor()

        colunas = ', '.join(df.columns)
        for index, row in df.iterrows():
            valores = ', '.join(['?' for _ in df.columns])
            dados = tuple(row.values)
            cursor.execute(f"INSERT INTO {nome_tabela} ({colunas}) VALUES ({valores})", dados)

        conn.commit()
        conn.close()
        return {"sucesso": True}
    except Exception as e:
        return {"erro": str(e)}
