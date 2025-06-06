import React, { useEffect, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Modal1 } from "../../../components/Modal1";
import { ModalButtons } from "../../../components/ModalButtons";
import { ModalIcon } from "../../../components/ModalIcon";
import demonstrativoIcon from "../../../assets/painelIcon.svg";

ModuleRegistry.registerModules([AllCommunityModule]);

export const Transparencia = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Campos do formulário
  const [idDemonst, setIdDemonst] = useState('');
  const [referencia, setReferencia] = useState('');
  const [ano, setAno] = useState('');
  const [periodicidade, setPeriodicidade] = useState('');
  const [dtPrevEntr, setDtPrevEntr] = useState('');
  const [dtEntrega, setDtEntrega] = useState('');
  const [demonstList, setDemonstList] = useState([]);

  var usuario = JSON.parse(localStorage.getItem('usuario'));
  var perfil = usuario?.perfil;

  const colDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true },
    { field: "referencia", headerName: "Referência", sortable: true, filter: true, },
    { field: "ano", headerName: "Ano", sortable: true, filter: true, },
    { field: "periodicidade", headerName: "Periodicidade", sortable: true, filter: true, },
    { field: "dt_prev_entr", headerName: "Previsão de Entrega", sortable: true, filter: true, },
    { field: "dt_entrega", headerName: "Data de Entrega", sortable: true, filter: true, },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/transparencia", {
        method: "GET",
        headers: { perfil: perfil },
      });
      const data = await res.json();
      console.log(data);
      setRowData(data);
    } catch (err) {
      console.error("Erro ao buscar transparencias:", err);
    }
  };

  const fetchDemonst = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/demonstrativo", {
        headers: { perfil: "Admin" },
      });
      const data = await res.json();
      setDemonstList(data);
    } catch (err) {
      console.error("Erro ao buscar demonstrativos:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDemonst();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/transparencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          perfil: perfil,
        },
        body: JSON.stringify({
          id_demonst: parseInt(idDemonst),
          referencia,
          ano: parseInt(ano),
          periodicidade,
          dt_prev_entr: dtPrevEntr,
          dt_entrega: dtEntrega,
        }),
      });
      if (res.ok) {
        setIdDemonst('');
        setReferencia('');
        setAno('');
        setPeriodicidade('');
        setDtPrevEntr('');
        setDtEntrega('');
        setIsCreateOpen(false);
        fetchData();
      } else {
        console.error("Erro ao criar entrega.");
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
          Adicionar Entrega
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
        <ModalIcon image={demonstrativoIcon} />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Cadastrar Entrega</h2>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="select-demonstrativo">Demonstrativo</label>
            <select
              id="select-demonstrativo"
              value={idDemonst}
              onChange={(e) => setIdDemonst(e.target.value)}
              className="border border-[#D5D7DA] rounded-[8px] py-2.5 px-3.5"
            >
              <option value="">Selecione um demonstrativo</option>
              {demonstList.map((dem) => (
                <option key={dem.id} value={dem.id}>
                  {dem.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Referência</label>
            <input type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Ano</label>
            <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Periodicidade</label>
            <input type="text" value={periodicidade} onChange={(e) => setPeriodicidade(e.target.value)} className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Data Prevista de Entrega</label>
            <input type="date" value={dtPrevEntr} onChange={(e) => setDtPrevEntr(e.target.value)} className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Data de Entrega</label>
            <input type="date" value={dtEntrega} onChange={(e) => setDtEntrega(e.target.value)} className="border rounded px-3 py-2" />
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
