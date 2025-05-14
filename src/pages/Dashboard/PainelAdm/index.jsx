import React, { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { themeAlpine } from 'ag-grid-community';
import { Modal1 } from "../../../components/Modal1";
import { ModalButtons } from "../../../components/ModalButtons";
import { ModalIcon } from "../../../components/ModalIcon";
import modalIcon from "../../../assets/tabelaIcon.svg"

ModuleRegistry.registerModules([AllCommunityModule]);

export const PainelAdm = () => {
  const gridRef = useRef();
  const [isFunOpen, setIsFunOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleModalTable = () => {
    setIsCreateOpen(true)
    setIsTableOpen(false)
  }

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

  return (
    <div className="p-4">
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
              <Modal1 isOpen={isFunOpen} onClose={() => setIsFunOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Este é o modal de funcionario</h2>
                <p>Você pode fechar clicando fora ou no "×" acima.</p>
              </Modal1>
              <Modal1 isOpen={isTableOpen} onClose={() => setIsTableOpen(false)}>
              <ModalIcon image={modalIcon}/>
                <div className="flex gap-3">
                  <ModalButtons text="Cancelar" onClick={() => setIsTableOpen(false)}/>
                  <ModalButtons text="Confirmar" onClick={() => handleModalTable()}/>
                </div>

              </Modal1>
              <Modal1 isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Este é o modal de create</h2>
                <p>Você pode fechar clicando fora ou no "×" acima.</p>
              </Modal1>
              <Modal1 isOpen={isExportOpen} onClose={() => setIsExportOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Este é o modal de export</h2>
                <p>Você pode fechar clicando fora ou no "×" acima.</p>
              </Modal1>


      <div className="ag-theme-alpine w-full h-[720px]">
        <AgGridReact
          ref={gridRef}
          theme={themeAlpine}
          rowHeight={rowHeight}
          rowData={rowData}
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
