import React, { useEffect, useRef, useState, useCallback } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Modal1 } from "../../../components/Modal1";
import { ModalInput } from "../../../components/ModalInput";
import { ModalIcon } from "../../../components/ModalIcon";
import { ModalButtons } from "../../../components/ModalButtons";
import instituicaoIcon from "../../../assets/painelIcon.svg";

ModuleRegistry.registerModules([AllCommunityModule]);

export const Demonstrativo = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [descricao, setDescricao] = useState('');


  const colDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true },
    { field: "descricao", headerName: "Nome da Instituição", sortable: true, filter: true, editable: true },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/demonstrativo", {
        method: "GET",
        headers: {
          "perfil": "Admin",
        },
      });
      const data = await res.json();
      console.log(data);
      setRowData(data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    console.log(descricao);
    try {
      const res = await fetch("http://127.0.0.1:5000/demonstrativo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "perfil": "Admin",
          },
        body: JSON.stringify({ descricao })
      });
      if (res.ok) {
        setDescricao('');
        setIsCreateOpen(false);
        fetchData();
      } else {
        console.error("Erro ao criar instituição.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Adicionar Instituição
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>

      <Modal1 isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <ModalIcon image={instituicaoIcon} />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Cadastrar Instituição</h2>
            <div className="flex flex-col gap-1.5">
                <label className="text-[#414651]"  htmlFor="modal-input">descricao</label>
                <input  onChange={(e) => setDescricao(e.target.value)} value={descricao} className=" border border-[#D5D7DA]  rounded-[8px] py-2.5 px-3.5" type="text" placeholder="digite a descrição da instituição"/>
            </div>
          <ModalButtons
            onCancel={() => setIsCreateOpen(false)}
            onClick={handleCreate}
            text="Cadastrar"
          />
        </div>
      </Modal1>
    </div>
  );
};