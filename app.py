from flask import Flask, request, jsonify
from flask_cors import CORS
from models import usuario_model, permissoes_model, instituicao_model, subseccional_model, demonstrativo_model
from models import transparencia_model, balancete_model, pagamentoCotas_model, prestacaoContasSubsecciona_model
from models import baseOrcamentaria_model

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "API rodando com sucesso!"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    NomeUsuario = data.get('NomeUsuario') 
    senha = data.get('senha')

    usuario = usuario_model.autenticar_usuario(NomeUsuario, senha)

    if usuario:
        return jsonify(usuario), 200
    else:
        return jsonify({"erro": "Usuário ou senha inválidos"}), 401

#Usuário
@app.route('/usuarios', methods=['POST'])
def criar_usuario():
    perfil = request.headers.get('perfil')
    if not permissoes_model.verificar_permissao(perfil, 'Usuarios', 'C'):
        return jsonify({'erro': 'Sem permissão para cadastrar usuário'}), 403

    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    nome_perfil = data.get('perfil')  # Ex: "Admin", "Escrita", etc.
    setor = data.get('setor')         # Novo campo
    cargo = data.get('cargo')         # Novo campo
    permissoes = data.get('permissoes', [])  # Lista de permissões

    # Validar campos obrigatórios
    if not all([nome, email, senha, nome_perfil]):
        return jsonify({'erro': 'Campos obrigatórios ausentes'}), 400

    resultado = usuario_model.cadastrar_usuario_com_permissoes(
        nome=nome,
        email=email,
        senha=senha,
        nome_perfil=nome_perfil,
        permissoes=permissoes,
        setor=setor,
        cargo=cargo
    )

    if "erro" in resultado:
        return jsonify(resultado), 400

    return jsonify(resultado), 201

@app.route('/usuarios/<email>', methods=['PUT'])
def editar_usuario(email):
    perfil = request.headers.get('perfil')
    if not permissoes_model.verificar_permissao(perfil, 'Usuarios', 'U'):
        return jsonify({'erro': 'Sem permissão para atualizar usuário'}), 403

    data = request.json
    novo_nome = data.get('nome')
    nova_senha = data.get('senha')
    novo_perfil = data.get('id_perfil')

    usuario_model.atualizar_usuario(email, novo_nome, nova_senha, novo_perfil)
    return jsonify({'mensagem': 'Usuário atualizado com sucesso'})

@app.route('/usuarios/<email>', methods=['DELETE'])
def excluir_usuario(email):
    perfil = request.headers.get('perfil')
    if not permissoes_model.verificar_permissao(perfil, 'Usuarios', 'D'):
        return jsonify({'erro': 'Sem permissão para excluir usuário'}), 403

    usuario_model.desativar_usuario(email)
    return jsonify({'mensagem': 'Usuário desativado com sucesso'})


#Instituição
@app.route('/instituicao', methods=['GET'])
def listar_instituicao():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Instituicao', 'R'):
        return jsonify({"erro": "Sem permissão para listar instituições"}), 403

    dados = instituicao_model.listar_instituicao()
    return jsonify(dados)

@app.route('/instituicao', methods=['POST'])
def criar_instituicao():
    perfil = request.headers.get('perfil') 

    if not permissoes_model.verificar_permissao(perfil, 'Instituicao', 'C'):
        return jsonify({"erro": "Sem permissão para criar instituição"}), 403

    data = request.json
    descricao = data.get('descricao')

    if not descricao:
        return jsonify({"erro": "Descrição obrigatória"}), 400

    instituicao_model.criar_instituicao(descricao)
    return jsonify({"mensagem": "Instituição criada com sucesso!"}), 201


#Subseccional
@app.route('/subseccional', methods=['GET'])
def listar_subseccionais():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Subseccional', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = subseccional_model.listar_subseccional()
    return jsonify(dados)

@app.route('/subseccional', methods=['POST'])
def criar_subseccional():
    perfil = request.headers.get('perfil')
    data = request.json
    descricao = data.get('descricao')
    id_usuario = data.get('id_usuario')

    if not permissoes_model.verificar_permissao(perfil, 'Subseccional', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    subseccional_model.criar_subseccional(descricao, id_usuario)
    return jsonify({"mensagem": "Subseccional criada com sucesso"}), 201

@app.route('/subseccional/<int:id>', methods=['PUT'])
def editar_subseccional(id):
    perfil = request.headers.get('perfil')
    data = request.json
    nova_descricao = data.get('descricao')

    if not permissoes_model.verificar_permissao(perfil, 'Subseccional', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    subseccional_model.atualizar_subseccional(id, nova_descricao)
    return jsonify({"mensagem": "Subseccional atualizada com sucesso"})

@app.route('/subseccional/<int:id>', methods=['DELETE'])
def deletar_subseccional(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Subseccional', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    subseccional_model.inativar_subseccional(id)
    return jsonify({"mensagem": "Subseccional inativada com sucesso"})


#Demonstrativo
@app.route('/demonstrativo', methods=['GET'])
def listar_demonstrativos():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Demonstrativo', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = demonstrativo_model.listar_demonstrativos()
    return jsonify(dados)

@app.route('/demonstrativo', methods=['POST'])
def criar_demonstrativo():
    perfil = request.headers.get('perfil')
    data = request.json
    descricao = data.get('descricao')

    if not permissoes_model.verificar_permissao(perfil, 'Demonstrativo', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    demonstrativo_model.criar_demonstrativo(descricao)
    return jsonify({"mensagem": "Demonstrativo criado com sucesso"}), 201

@app.route('/demonstrativo/<int:id>', methods=['PUT'])
def editar_demonstrativo(id):
    perfil = request.headers.get('perfil')
    data = request.json
    nova_descricao = data.get('descricao')

    if not permissoes_model.verificar_permissao(perfil, 'Demonstrativo', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    demonstrativo_model.atualizar_demonstrativo(id, nova_descricao)
    return jsonify({"mensagem": "Demonstrativo atualizado com sucesso"})

@app.route('/demonstrativo/<int:id>', methods=['DELETE'])
def deletar_demonstrativo(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Demonstrativo', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    demonstrativo_model.inativar_demonstrativo(id)
    return jsonify({"mensagem": "Demonstrativo inativado com sucesso"})


#Transparência
@app.route('/transparencia', methods=['GET'])
def listar_transparencias():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Transparencia', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = transparencia_model.listar_transparencias()
    return jsonify(dados)

@app.route('/transparencia', methods=['POST'])
def criar_transparencia():
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'Transparencia', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    transparencia_model.criar_transparencia(
        id_demonst=data.get('id_demonst'),
        referencia=data.get('referencia'),
        ano=data.get('ano'),
        periodicidade=data.get('periodicidade'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega')
    )
    return jsonify({"mensagem": "Transparência criada com sucesso"}), 201


@app.route('/transparencia/<int:id>', methods=['PUT'])
def editar_transparencia(id):
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'Transparencia', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    transparencia_model.atualizar_transparencia(
        id=id,
        referencia=data.get('referencia'),
        ano=data.get('ano'),
        periodicidade=data.get('periodicidade'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega')
    )
    return jsonify({"mensagem": "Transparência atualizada com sucesso"})

@app.route('/transparencia/<int:id>', methods=['DELETE'])
def deletar_transparencia(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Transparencia', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    transparencia_model.inativar_transparencia(id)
    return jsonify({"mensagem": "Transparência inativada com sucesso"})


#BalanceteCFOAB
@app.route('/balancete', methods=['GET'])
def listar_balancetes():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'BalanceteCFOAB', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = balancete_model.listar_balancetes()
    return jsonify(dados)

@app.route('/balancete', methods=['POST'])
def criar_balancete():
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'BalanceteCFOAB', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    balancete_model.criar_balancete(
        id_demonst=data.get('id_demonst'),
        referencia=data.get('referencia'),
        ano=data.get('ano'),
        periodicidade=data.get('periodicidade'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega'),
        eficiencia=data.get('eficiencia')
    )
    return jsonify({"mensagem": "Balancete criado com sucesso"}), 201


@app.route('/balancete/<int:id>', methods=['PUT'])
def editar_balancete(id):
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'BalanceteCFOAB', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    balancete_model.atualizar_balancete(
        id=id,
        referencia=data.get('referencia'),
        ano=data.get('ano'),
        periodicidade=data.get('periodicidade'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega'),
        eficiencia=data.get('eficiencia')
    )
    return jsonify({"mensagem": "Balancete atualizado com sucesso"})

@app.route('/balancete/<int:id>', methods=['DELETE'])
def deletar_balancete(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'BalanceteCFOAB', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    balancete_model.inativar_balancete(id)
    return jsonify({"mensagem": "Balancete inativado com sucesso"})


#PagamentoContas
@app.route('/pagamentoContas', methods=['GET'])
def listar_pagamentos():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'PagamentoCotas', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = pagamentoCotas_model.listar_pagamentos()
    return jsonify(dados)

@app.route('/pagamentos', methods=['POST'])
def criar_pagamento():
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'PagamentoCotas', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    pagamentoCotas_model.criar_pagamento(
        id_instit=data.get('id_instit'),
        mes_ref=data.get('mes_ref'),
        ano_ref=data.get('ano_ref'),
        dt_prev_entr=data.get('dt_prev_entr'),
        valor_duodecimo=data.get('valor_duodecimo'),
        valor_desconto=data.get('valor_desconto'),
        id_tpdesc=data.get('id_tpdesc'),
        valor_pago=data.get('valor_pago'),
        dt_pagto=data.get('dt_pagto'),
        observacao=data.get('observacao')
    )
    return jsonify({"mensagem": "Pagamento registrado com sucesso"}), 201

@app.route('/pagamentos/<int:id>', methods=['PUT'])
def editar_pagamento(id):
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'PagamentoCotas', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    pagamentoCotas_model.atualizar_pagamento(
        id=id,
        mes_ref=data.get('mes_ref'),
        ano_ref=data.get('ano_ref'),
        dt_prev_entr=data.get('dt_prev_entr'),
        valor_duodecimo=data.get('valor_duodecimo'),
        valor_desconto=data.get('valor_desconto'),
        id_tpdesc=data.get('id_tpdesc'),
        valor_pago=data.get('valor_pago'),
        dt_pagto=data.get('dt_pagto'),
        observacao=data.get('observacao')
    )
    return jsonify({"mensagem": "Pagamento atualizado com sucesso"})

@app.route('/pagamentos/<int:id>', methods=['DELETE'])
def deletar_pagamento(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'PagamentoCotas', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    pagamentoCotas_model.inativar_pagamento(id)
    return jsonify({"mensagem": "Pagamento inativado com sucesso"})


#PrestacaoContasSubseccional
@app.route('/prestacoes', methods=['GET'])
def listar_prestacoes():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'PrestacaoContasSubseccional', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = prestacaoContasSubsecciona_model.listar_prestacoes()
    return jsonify(dados)

@app.route('/prestacoes', methods=['POST'])
def criar_prestacao():
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'PrestacaoContasSubseccional', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    prestacaoContasSubsecciona_model.criar_prestacao(
        id_subseccional=data.get('id_subseccional'),
        mes_ref=data.get('mes_ref'),
        ano_ref=data.get('ano_ref'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega'),
        dt_pagto=data.get('dt_pagto'),
        valor_pago=data.get('valor_pago'),
        eficiencia=data.get('eficiencia'),
        observacao=data.get('observacao')
    )
    return jsonify({"mensagem": "Prestação criada com sucesso"}), 201

@app.route('/prestacoes/<int:id>', methods=['PUT'])
def editar_prestacao(id):
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'PrestacaoContasSubseccional', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    prestacaoContasSubsecciona_model.atualizar_prestacao(
        id=id,
        mes_ref=data.get('mes_ref'),
        ano_ref=data.get('ano_ref'),
        dt_prev_entr=data.get('dt_prev_entr'),
        dt_entrega=data.get('dt_entrega'),
        dt_pagto=data.get('dt_pagto'),
        valor_pago=data.get('valor_pago'),
        eficiencia=data.get('eficiencia'),
        observacao=data.get('observacao')
    )
    return jsonify({"mensagem": "Prestação atualizada com sucesso"})

@app.route('/prestacoes/<int:id>', methods=['DELETE'])
def deletar_prestacao(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'PrestacaoContasSubseccional', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    prestacaoContasSubsecciona_model.inativar_prestacao(id)
    return jsonify({"mensagem": "Prestação inativada com sucesso"})


# BaseOrcamentaria
@app.route('/orcamentos', methods=['GET'])
def listar_lancamentos():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'BaseOrcamentaria', 'R'):
        return jsonify({"erro": "Sem permissão para leitura"}), 403

    dados = baseOrcamentaria_model.listar_lancamentos()
    return jsonify(dados)

@app.route('/orcamentos', methods=['POST'])
def criar_lancamentos():
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'BaseOrcamentaria', 'C'):
        return jsonify({"erro": "Sem permissão para criação"}), 403

    baseOrcamentaria_model.criar_lancamento(
        id_lancto=data.get('id_lancto'),
        lancto=data.get('lancto'),
        valor=data.get('valor'),
        dt_docto=data.get('dt_docto'),
        dt_lancto=data.get('dt_lancto'),
        ano=data.get('ano'),
        tipo=data.get('tipo')
    )
    return jsonify({"mensagem": "Lançamento criado com sucesso"}), 201

@app.route('/orcamentos/<int:id>', methods=['PUT'])
def editar_lancamentos(id):
    perfil = request.headers.get('perfil')
    data = request.json

    if not permissoes_model.verificar_permissao(perfil, 'BaseOrcamentaria', 'U'):
        return jsonify({"erro": "Sem permissão para edição"}), 403

    baseOrcamentaria_model.atualizar_lancamento(
        id=id,
        lancto=data.get('lancto'),
        valor=data.get('valor'),
        dt_docto=data.get('dt_docto'),
        dt_lancto=data.get('dt_lancto'),
        ano=data.get('ano'),
        tipo=data.get('tipo')
    )
    return jsonify({"mensagem": "Lançamento atualizado com sucesso"})

@app.route('/orcamentos/<int:id>', methods=['DELETE'])
def deletar_lancamentos(id):
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'BaseOrcamentaria', 'D'):
        return jsonify({"erro": "Sem permissão para inativar"}), 403

    baseOrcamentaria_model.inativar_lancamento(id)
    return jsonify({"mensagem": "Lançamento inativado com sucesso"})

if __name__ == '__main__':
    app.run(debug=True)
