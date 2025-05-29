import React, { useEffect, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Modal1 } from "../../../components/Modal1";
import { ModalButtons } from "../../../components/ModalButtons";
import { ModalIcon } from "../../../components/ModalIcon";
import demonstrativoIcon from "../../../assets/painelIcon.svg";

ModuleRegistry.registerModules([AllCommunityModule]);

export const PrestacaoSubseccional = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form fields
  const [idSubseccional, setIdSubseccional] = useState('');
  const [subseccionalList, setSubseccionalList] = useState([]);
  const [mesRef, setMesRef] = useState('');
  const [anoRef, setAnoRef] = useState('');
  const [dtPrevEntr, setDtPrevEntr] = useState('');
  const [dtEntrega, setDtEntrega] = useState('');
  const [dtPagto, setDtPagto] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [eficiencia, setEficiencia] = useState('');
  const [observacao, setObservacao] = useState('');

  var usuario = JSON.parse(localStorage.getItem('usuario'));
  var perfil = usuario?.perfil;

  const colDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true, },
    { field: "subseccional", headerName: "Subseccional", flex: 1, sortable: true, filter: true, },
    { field: "mes_ref", headerName: "Mês Ref.", sortable: true, filter: true, },
    { field: "ano_ref", headerName: "Ano Ref.", sortable: true, filter: true, },
    { field: "dt_prev_entr", headerName: "Previsão Entrega", sortable: true, filter: true, },
    { field: "dt_entrega", headerName: "Data Entrega", sortable: true, filter: true, },
    { field: "dt_pagto", headerName: "Data Pagamento", sortable: true, filter: true, },
    { field: "valor_pago", headerName: "Valor Pago", sortable: true, filter: true, },
    { field: "eficiencia", headerName: "Eficiência", sortable: true, filter: true, },
    { field: "observacao", headerName: "Observação", flex: 1, sortable: true, filter: true, }
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/prestacoes", {
        headers: { perfil: perfil },
      });
      const data = await res.json();
      setRowData(data);
    } catch (err) {
      console.error("Erro ao buscar prestações:", err);
    }
  };

  const fetchSubseccionais = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/subseccional", {
        headers: { perfil: "Admin" },
      });
      const data = await res.json();
      setSubseccionalList(data);
    } catch (err) {
      console.error("Erro ao buscar subseccionais:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSubseccionais();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/prestacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          perfil: perfil,
        },
        body: JSON.stringify({
          id_subseccional: parseInt(idSubseccional),
          mes_ref: mesRef,
          ano_ref: parseInt(anoRef),
          dt_prev_entr: dtPrevEntr,
          dt_entrega: dtEntrega,
          dt_pagto: dtPagto,
          valor_pago: parseFloat(valorPago),
          eficiencia: eficiencia,
          observacao: observacao,
        }),
      });

      if (res.ok) {
        // Limpar campos
        setIdSubseccional('');
        setMesRef('');
        setAnoRef('');
        setDtPrevEntr('');
        setDtEntrega('');
        setDtPagto('');
        setValorPago('');
        setEficiencia('');
        setObservacao('');
        setIsCreateOpen(false);
        fetchData();
      } else {
        console.error("Erro ao criar prestação.");
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
          Adicionar Prestação
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
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
          <h2 className="text-xl font-bold">Cadastrar Prestação</h2>

          <div className="flex flex-col gap-1.5">
            <label>Subseccional</label>
            <select
              value={idSubseccional}
              onChange={(e) => setIdSubseccional(e.target.value)}
              className="border border-[#D5D7DA] rounded-[8px] py-2.5 px-3.5"
            >
              <option value="">Selecione uma subseccional</option>
              {subseccionalList.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Mês Referência</label>
              <input
                type="text"
                value={mesRef}
                onChange={(e) => setMesRef(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Ano Referência</label>
              <input
                type="number"
                value={anoRef}
                onChange={(e) => setAnoRef(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Previsão Entrega</label>
              <input
                type="date"
                value={dtPrevEntr}
                onChange={(e) => setDtPrevEntr(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Data Entrega</label>
              <input
                type="date"
                value={dtEntrega}
                onChange={(e) => setDtEntrega(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Data Pagamento</label>
              <input
                type="date"
                value={dtPagto}
                onChange={(e) => setDtPagto(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Valor Pago</label>
              <input
                type="number"
                step="0.01"
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Eficiência</label>
            <input
              type="text"
              value={eficiencia}
              onChange={(e) => setEficiencia(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Observação</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="border rounded px-3 py-2"
              rows={3}
            />
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
