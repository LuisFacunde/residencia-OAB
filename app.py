from flask import Flask, request, jsonify
from flask_cors import CORS
from models import usuario_model, permissoes_model, instituicao_model

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
        return jsonify({"erro": "Email ou senha inválidos"}), 401

@app.route('/instituicoes', methods=['GET'])
def listar_instituicoes():
    perfil = request.headers.get('perfil')

    if not permissoes_model.verificar_permissao(perfil, 'Instituicao', 'R'):
        return jsonify({"erro": "Sem permissão para listar instituições"}), 403

    dados = instituicao_model.listar_instituicoes()
    return jsonify(dados)

@app.route('/instituicoes', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
