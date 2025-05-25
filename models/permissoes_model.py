from db_conexao import conectar

def verificar_permissao(perfil, modulo, acao):
    """
    Verifica se o perfil tem permissão para realizar uma ação (C, R, U, D) em um módulo.
    """
    coluna_permissao = {
        'C': 'P_Create',
        'R': 'P_Read',
        'U': 'P_Update',
        'D': 'P_Delete'
    }.get(acao.upper())

    if coluna_permissao is None:
        return False

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT {coluna_permissao}
        FROM Permissoes PER
        INNER JOIN Perfis P ON P.Id = PER.Id_Perfil
        WHERE P.Nome = ? AND PER.Modulo = ?
    """, (perfil, modulo))

    resultado = cursor.fetchone()
    conn.close()

    return resultado and resultado[0] == 1
