import React, { StrictMode, useRef, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { themeAlpine } from 'ag-grid-community';
import { Modal1 } from "../../../components/Modal1";
import { ModalIcon } from "../../../components/ModalIcon";
import { ModalButtons } from "../../../components/ModalButtons";
import funcionarioIcon from "../../../assets/funcionarioIcon.svg";
import perfilIcon from "../../../assets/profile.svg";
import { ModalInput2 } from "../../../components/ModalInput2";
import { ModalSelect } from "../../../components/ModalSelect";
ModuleRegistry.registerModules([AllCommunityModule]);

export const PainelAdm = () => {
  const gridRef = useRef();
  const [isFunOpen, setIsFunOpen] = useState(false);
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [perfisDisponiveis, setPerfisDisponiveis] = useState([]); // Estado para armazenar os perfis

  // Estado para o formulário de funcionário
  const [funcionarioData, setFuncionarioData] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: '',
    setor: '',
    cargo: ''
  });

  // Estado para o formulário de perfil
  const [perfilData, setPerfilData] = useState({
    nome: '',
  });

  // Estado para módulos de permissão
  const [permissoes, setPermissoes] = useState([
    { modulo: 'Subseccional', create: false, read: false, update: false, delete: false },
    { modulo: 'Demonstrativo', create: false, read: false, update: false, delete: false },
    { modulo: 'Instituicao', create: false, read: false, update: false, delete: false },
    { modulo: 'Transparencia', create: false, read: false, update: false, delete: false },
    { modulo: 'BalanceteCFOAB', create: false, read: false, update: false, delete: false },
    { modulo: 'PagamentoCotas', create: false, read: false, update: false, delete: false },
    { modulo: 'PrestacaoContasSubseccional', create: false, read: false, update: false, delete: false },
    { modulo: 'BaseOrcamentaria', create: false, read: false, update: false, delete: false },
    { modulo: 'Usuarios', create: false, read: false, update: false, delete: false },
    { modulo: 'Perfis', create: false, read: false, update: false, delete: false }
  ]);

  const [colDefs] = useState([
    {
      field: "NomeUsuario",
      headerName: "Funcionário",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      field: "Setor",
      headerName: "Setor",
      sortable: true,
      filter: true,
    },
    { 
      field: "Perfil", 
      headerName: "Perfil", 
      sortable: true, 
      filter: true 
    },
    { 
      field: "Email", 
      headerName: "Email", 
      sortable: true, 
      filter: true 
    },
    { 
      field: "Cargo", 
      headerName: "Cargo", 
      sortable: true, 
      filter: true 
    },
    { 
      field: "Status", 
      headerName: "Status", 
      sortable: true, 
      filter: true,
      cellRenderer: (params) => {
        return params.value === 'A' ? 'Ativo' : 'Inativo';
      }
    }
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  // Função para carregar os usuários
  const carregarUsuarios = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const perfil = usuario?.perfil;

      const response = await fetch('http://127.0.0.1:5000/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'perfil': perfil
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }

      const data = await response.json();
      setRowData(data);
      setFilteredRowData(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert(error.message);
    }
  };

  // Função para carregar os perfis disponíveis
  const carregarPerfis = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const perfil = usuario?.perfil;

      const response = await fetch('http://127.0.0.1:5000/perfis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'perfil': perfil
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar perfis');
      }

      const data = await response.json();
      setPerfisDisponiveis(data);
    } catch (error) {
      console.error('Erro ao carregar perfis:', error);
      alert(error.message);
    }
  };

  // Manipulador de mudança para os campos do formulário de usuário
  const handleFuncionarioChange = (e) => {
    const { name, value } = e.target;
    setFuncionarioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipulador de mudança para os campos do formulário de perfil
  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipulador para mudanças nas permissões
  const handlePermissaoChange = (modulo, tipo) => {
    setPermissoes(prev => prev.map(item => {
      if (item.modulo === modulo) {
        return { ...item, [tipo]: !item[tipo] };
      }
      return item;
    }));
  };

  // Função para enviar os dados do funcionário
  const criarFuncionario = async () => {
    try {
      if (!funcionarioData.nome || !funcionarioData.email || !funcionarioData.senha || !funcionarioData.perfil) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      const payload = {
        nome: funcionarioData.nome,
        email: funcionarioData.email,
        senha: funcionarioData.senha,
        perfil: funcionarioData.perfil,
        setor: funcionarioData.setor,
        cargo: funcionarioData.cargo
      };

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const perfil = usuario?.perfil;

      const response = await fetch('http://127.0.0.1:5000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'perfil': perfil
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar usuário');
      }

      alert('Funcionário criado com sucesso!');
      setIsFunOpen(false);
      
      // Resetar o formulário e recarregar os usuários
      setFuncionarioData({
        nome: '',
        email: '',
        senha: '',
        perfil: '',
        setor: '',
        cargo: ''
      });

      await carregarUsuarios();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Erro ao criar funcionário');
    }
  };

  // Função para criar um novo perfil
  const criarPerfil = async () => {
    try {
      if (!perfilData.nome) {
        throw new Error('Nome do perfil é obrigatório');
      }

      // Preparar as permissões no formato esperado pelo backend
      const permissoesFormatadas = permissoes.map(modulo => ({
        modulo: modulo.modulo,
        create: modulo.create ? 1 : 0,
        read: modulo.read ? 1 : 0,
        update: modulo.update ? 1 : 0,
        delete: modulo.delete ? 1 : 0
      }));

      const payload = {
        nome: perfilData.nome,
        permissoes: permissoesFormatadas
      };

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const perfilAdmin = usuario?.perfil;

      const response = await fetch('http://127.0.0.1:5000/perfis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'perfil': perfilAdmin
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar perfil');
      }

      alert('Perfil criado com sucesso!');
      setIsPerfilOpen(false);
      
      // Resetar o formulário e recarregar perfis
      setPerfilData({ nome: '' });
      setPermissoes(permissoes.map(p => ({
        ...p,
        create: false,
        read: false,
        update: false,
        delete: false
      })));

      await carregarPerfis();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Erro ao criar perfil');
    }
  };

  // Carrega os usuários e perfis quando o componente é montado
  useEffect(() => {
    carregarUsuarios();
    carregarPerfis();
  }, []);

  // Atualiza os dados filtrados quando rowData ou quickFilterText mudam
  useEffect(() => {
    if (!quickFilterText) {
      setFilteredRowData(rowData);
      return;
    }

    const filteredData = rowData.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(quickFilterText.toLowerCase())
      );
    });

    setFilteredRowData(filteredData);
  }, [quickFilterText, rowData]);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <ul className="flex gap-3.5">
          <li>
            <button 
              onClick={() => setIsFunOpen(true)} 
              className="bg-[#C0090E] text-white px-4 py-2 cursor-pointer rounded-[10px] mb-4"
            >
              Adicionar Funcionario
            </button>
          </li>
          <li>
            <button 
              onClick={() => setIsPerfilOpen(true)} 
              className="bg-[#062360] text-white px-4 py-2 cursor-pointer rounded-[10px] mb-4"
            >
              Criar Perfil
            </button>
          </li>
        </ul>
        <div className="w-[400px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar em todos os dados..."
              className="p-2 border border-gray-300 rounded-md w-full pl-10"
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {quickFilterText && (
              <button
                onClick={() => setQuickFilterText('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Criar Funcionário */}
      <Modal1 isOpen={isFunOpen} onClose={() => setIsFunOpen(false)}>
        <ModalIcon image={funcionarioIcon}/>
        <div className="flex flex-col gap-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Preencha os dados para cadastrar um novo funcionário no sistema da OAB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModalInput2 
              label="Nome Completo*" 
              placeholder="Nome completo"
              name="nome"
              value={funcionarioData.nome}
              onChange={handleFuncionarioChange}
            />
            <ModalInput2 
              label="Email*" 
              placeholder="Email do funcionário"
              type="email"
              name="email"
              value={funcionarioData.email}
              onChange={handleFuncionarioChange}
            />
            <ModalInput2 
              label="Senha*" 
              placeholder="Senha temporária"
              type="password"
              name="senha"
              value={funcionarioData.senha}
              onChange={handleFuncionarioChange}
            />
            <ModalSelect
              label="Perfil*"
              name="perfil"
              value={funcionarioData.perfil}
              onChange={handleFuncionarioChange}
              options={perfisDisponiveis.map(perfil => ({
                value: perfil.nome,
                label: perfil.nome
              }))}
              placeholder="Selecione um perfil"
            />
            <ModalInput2 
              label="Setor" 
              placeholder="Setor do funcionário"
              name="setor"
              value={funcionarioData.setor}
              onChange={handleFuncionarioChange}
            />
            <ModalInput2 
              label="Cargo" 
              placeholder="Cargo do funcionário"
              name="cargo"
              value={funcionarioData.cargo}
              onChange={handleFuncionarioChange}
            />
          </div>

          <div className="flex gap-3 mt-6 justify-end border-t border-gray-100 pt-4">
            <ModalButtons 
              text="Cancelar" 
              onClick={() => setIsFunOpen(false)} 
              variant="secondary"
            />
            <ModalButtons 
              text="Cadastrar Funcionário" 
              onClick={criarFuncionario} 
              variant="primary"
            />
          </div>
        </div>
      </Modal1>

      {/* Modal de Criar Perfil */}
      <Modal1 isOpen={isPerfilOpen} onClose={() => setIsPerfilOpen(false)}>
        <ModalIcon image={perfilIcon}/>
        <div className="flex flex-col gap-4">
          <div className="text-center mb-4">
            <p className="text-gray-600">Crie um novo perfil com as permissões específicas</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ModalInput2 
              label="Nome do Perfil*" 
              placeholder="Nome do perfil"
              name="nome"
              value={perfilData.nome}
              onChange={handlePerfilChange}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Permissões do Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto p-2">
              {permissoes.map((modulo, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-[#062360] rounded-full mr-2"></span>
                    {modulo.modulo}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={modulo.create} 
                        onChange={() => handlePermissaoChange(modulo.modulo, 'create')} 
                        className="form-checkbox h-4 w-4 text-[#C0090E] rounded focus:ring-[#C0090E] border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Criar</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={modulo.read} 
                        onChange={() => handlePermissaoChange(modulo.modulo, 'read')} 
                        className="form-checkbox h-4 w-4 text-[#C0090E] rounded focus:ring-[#C0090E] border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Ler</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={modulo.update} 
                        onChange={() => handlePermissaoChange(modulo.modulo, 'update')} 
                        className="form-checkbox h-4 w-4 text-[#C0090E] rounded focus:ring-[#C0090E] border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Atualizar</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={modulo.delete} 
                        onChange={() => handlePermissaoChange(modulo.modulo, 'delete')} 
                        className="form-checkbox h-4 w-4 text-[#C0090E] rounded focus:ring-[#C0090E] border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Deletar</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6 justify-end border-t border-gray-100 pt-4">
            <ModalButtons 
              text="Cancelar" 
              onClick={() => setIsPerfilOpen(false)} 
              variant="secondary"
            />
            <ModalButtons 
              text="Criar Perfil" 
              onClick={criarPerfil} 
              variant="primary"
            />
          </div>
        </div>
      </Modal1>

      <div className="ag-theme-alpine w-full h-[60vh]">
        <AgGridReact
          ref={gridRef}
          theme={themeAlpine}
          rowData={filteredRowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowSelection="multiple"
          editType="fullRow"
          onGridReady={() => gridRef.current.api.sizeColumnsToFit()}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <PainelAdm />
  </StrictMode>
);