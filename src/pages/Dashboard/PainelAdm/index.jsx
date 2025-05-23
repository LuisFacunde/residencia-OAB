import React, { StrictMode, useRef, useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { themeAlpine } from 'ag-grid-community';
import { Modal1 } from "../../../components/Modal1";
import { ModalInput } from "../../../components/ModalInput";
import { ModalIcon } from "../../../components/ModalIcon";
import { ModalButtons } from "../../../components/ModalButtons";
import modalIcon from "../../../assets/tabelaIcon.svg"
import funcionarioIcon from "../../../assets/funcionarioIcon.svg"
ModuleRegistry.registerModules([AllCommunityModule]);

export const PainelAdm = () => {
  const gridRef = useRef();
  const [isFunOpen, setIsFunOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [columns, setColumns] = useState(['']);
  

    
  const addColumn = () => {
    setColumns([...columns, '']); 
  };

  const handleColumnChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };
  const [rowData, setRowData] = useState([
    { func: "Caio.Carvalho", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "Arthur.Tavares", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "Jamila.Lobo", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "Luiz.Facundes", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "Lucas.Deodato", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "Coraline", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
    { func: "teste", Setor: "Advocacia", info1: "info extra?", info2: "info extra?", info3: "info extra?" },
  ]);

  const [colDefs] = useState([
    {
      field: "func",
      headerName: "Funcionário",
      sortable: true,
      filter: true,
      // floatingFilter: true,C
      editable: true,
      checkboxSelection: true,
    },
    {
      field: "Setor",
      headerName: "Setor",
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Advocacia", "Financeiro", "RH", "TI", "Logística"],
      },
    },
    { field: "info1", headerName: "Info Extra?", sortable: true, filter: true, editable: true },
    { field: "info2", headerName: "Info Extra?", sortable: true, filter: true, editable: true },
    { field: "info3", headerName: "Info Extra?", sortable: true, filter: true, editable: true },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const rowHeight = 50;

  const [quickFilterText, setQuickFilterText] = useState('');
  const [filteredRowData, setFilteredRowData] = useState([]);

  useEffect(() => {
    setFilteredRowData(rowData);
  }, [rowData]);

  const onFilterTextBoxChanged = useCallback((e) => {
    const searchValue = e.target.value.toLowerCase();
    setQuickFilterText(searchValue);
    
    if (!searchValue) {
      setFilteredRowData(rowData);
      return;
    }

    const filteredData = rowData.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchValue)
      );
    });

    setFilteredRowData(filteredData);
  }, [rowData]);

    const handleModalTable = () => {
      if (selectedOption === 'hosting-small') {
        setIsCreateOpen(true);
      } else if (selectedOption === 'hosting-big') {
        setIsExportOpen(true);
      }
      setIsTableOpen(false);
    };
    
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <ul className="flex gap-3.5">
            <li>
                <button
                    onClick={() => {
                    const selectedNodes = gridRef.current.api.getSelectedNodes();
                    const selectedData = selectedNodes.map(node => node.data);
                    const updatedData = rowData.filter(row => !selectedData.includes(row));
                    setRowData(updatedData);
                    }}
                    className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-[10px] mb-4"
                    >
                    Deletar linhas selecionadas
                </button>
            </li>
            <li>
                <button onClick={() => setIsFunOpen(true)} className="bg-[#C0090E] text-white px-4 py-2 cursor-pointer  rounded-[10px] mb-4">
                    Adicionar Funcionario
                </button>
            </li>
            <li>
                <button onClick={() => setIsTableOpen(true)} className="bg-[#062360] text-white px-4 py-2 cursor-pointer  rounded-[10px] mb-4">
                    Criar Tabela
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
              onChange={onFilterTextBoxChanged}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {quickFilterText && (
              <button
                onClick={() => {
                  setQuickFilterText('');
                  setFilteredRowData(rowData);
                }}
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
              <Modal1 isOpen={isFunOpen} onClose={() => setIsFunOpen(false)}>
                <ModalIcon image={funcionarioIcon}/>
                <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-bold">Criar Funcionario</h2>
                      <p>Preencha os dados para cadastrar um novo funcionário no sistema da OAB.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <ModalInput  label="Nome Completo" placeholder="Nome completo"  />
                      <ModalInput  label="Setor" placeholder="Digite o setor"  />
                    </div>

                    <div className="flex gap-3 mt-3">
                      <ModalButtons text="Cancelar" onClick={() => setIsFunOpen(false)}/>
                      <ModalButtons text="Confirmar" />
                    </div>
                </div>
              </Modal1>
              <Modal1 isOpen={isTableOpen} onClose={() => setIsTableOpen(false)}>
                <div className="flex flex-col gap-5">
                  <ModalIcon image={modalIcon}/>
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-[#181D27] font-bold text-[18px]">Criar Tabela</h1>
                    <p className="text-[#535862] text-[14px]">Escolha a criação de tabela mais apropriada para o seu objetivo</p>
                  </div>         
                  <ul className="flex w-full gap-3 flex-col">
                    <li>
                      <input
                        type="radio"
                        id="hosting-small"
                        name="hosting"
                        value="hosting-small"
                        className="hidden peer"
                        checked={selectedOption === 'hosting-small'}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="hosting-small"
                        className="inline-flex items-center justify-between peer-checked:text-[#6941C6] w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#E5DCFB] peer-checked:border-2 peer-checked:bg-[#F9F5FF] hover:text-[#6941C6] hover:bg-gray-100"
                      >
                        <div className="block">
                          <h1 className="w-full text-lg font-semibold">Criar Tabela Nova</h1>
                          <p className="w-full">Criação de tabela a partir de colunas</p>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </label>
                    </li>

                    <li>
                      <input
                        type="radio"
                        id="hosting-big"
                        name="hosting"
                        value="hosting-big"
                        className="hidden peer"
                        checked={selectedOption === 'hosting-big'}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <label
                        htmlFor="hosting-big"
                        className="inline-flex items-center justify-between peer-checked:text-[#6941C6] w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-[#E5DCFB] peer-checked:border-2 peer-checked:bg-[#F9F5FF] hover:text-[#6941C6] hover:bg-gray-100"
                      >
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Exportar Planilha</div>
                          <div className="w-full">Criação de tabela a partir de uma planilha</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </label>
                    </li>
                  </ul>
                  <div className="flex gap-3">
                    <ModalButtons text="Cancelar" onClick={() => setIsTableOpen(false)}/>
                    <ModalButtons text="Confirmar" onClick={handleModalTable}/>
                  </div>
                </div>
              </Modal1>
              <Modal1 isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <ModalIcon image={modalIcon}/>
                <div className="flex flex-col gap-5 mt-4">

                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold ">Criar Tabela</h2>
                    <p>Preencha as informações para criar uma nova tabela.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ModalInput label="Nome da tabela" placeholder="Digite o nome da tabela"/>
                    
                    {columns.map((column, index) => (
                      <ModalInput 
                        key={index}
                        label={index === 0 ? "Coluna da Tabela" : false}
                        placeholder="Digite o nome da coluna"
                        value={column}
                        onChange={(e) => handleColumnChange(index, e.target.value)}
                      />
                    ))}
                    
                    <button 
                      className="text-[#062360] cursor-pointer font-medium w-fit px-2 py-1 rounded hover:bg-[#b0c5ed] transition-colors"
                      onClick={addColumn}
                    >
                      + Adicionar Coluna
                    </button>
                </div>

                
                  <div className="flex gap-3 mt-3">
                      <ModalButtons text="Cancelar" onClick={() => setIsCreateOpen(false)}/>
                      <ModalButtons text="Confirmar" />
                    </div>
                </div>
              </Modal1>
              <Modal1 isOpen={isExportOpen} onClose={() => setIsExportOpen(false)}>
              <div className="flex flex-col gap-5">
                  <ModalIcon image={modalIcon}/>
                  <div className="flex flex-col gap-0.5">
                    <h1 className="text-[#181D27] font-bold text-[18px]">Criar Tabela</h1>
                    <p className="text-[#535862] text-[14px]">Selecione o ficheiro da sua planilha</p>
                  </div>
                  <ModalInput showLabel={false} placeholder="Selecione o ficheiro"  />
                  <div className="flex gap-3">
                    <ModalButtons text="Cancelar" onClick={() => setIsExportOpen(false)}/>
                    <ModalButtons text="Confirmar" onClick={() => setIsExportOpen(false)}/>
                  </div>
                </div>
              </Modal1>


      <div className="ag-theme-alpine w-full h-[60vh]">
        <AgGridReact
          ref={gridRef}
          theme={themeAlpine}
          rowHeight={rowHeight}
          rowData={filteredRowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          rowSelection="multiple"
           editType="fullRow"
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
