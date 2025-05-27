from db_conexao import conectar

def criar_nova_tabela(nome_tabela, colunas):
    try:
        conn = conectar()
        cursor = conn.cursor()

        if not nome_tabela.replace('_', '').isalnum():
            return {"erro": "Nome da tabela inválido"}

        colunas_sql = []
        for col in colunas:
            nome = col.get('nome')
            tipo = col.get('tipo')

            if not nome or not tipo:
                return {"erro": "Cada coluna deve ter nome e tipo"}

            if tipo.upper() not in ['INT', 'VARCHAR(100)', 'DATE', 'DECIMAL(10,2)']:
                return {"erro": f"Tipo de dado inválido: {tipo}"}

            colunas_sql.append(f"{nome} {tipo}")

        comando = f"CREATE TABLE {nome_tabela} (Id INT IDENTITY(1,1) PRIMARY KEY, {', '.join(colunas_sql)})"
        cursor.execute(comando)
        conn.commit()
        conn.close()
        return {"sucesso": True}

    except Exception as e:
        return {"erro": str(e)}
