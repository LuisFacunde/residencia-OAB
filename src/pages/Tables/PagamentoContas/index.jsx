import React, { useEffect, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Modal1 } from "../../../components/Modal1";
import { ModalButtons } from "../../../components/ModalButtons";
import { ModalIcon } from "../../../components/ModalIcon";
import demonstrativoIcon from "../../../assets/painelIcon.svg";

ModuleRegistry.registerModules([AllCommunityModule]);

export const PagamentoContas = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form fields
  const [idInstit, setIdInstit] = useState('');
  const [institList, setInstitList] = useState([]);
  const [mesRef, setMesRef] = useState('');
  const [anoRef, setAnoRef] = useState('');
  const [dtPrevEntr, setDtPrevEntr] = useState('');
  const [valorDuodecimo, setValorDuodecimo] = useState('');
  const [valorDesconto, setValorDesconto] = useState('');
  const [idTpdesc, setIdTpdesc] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [dtPagto, setDtPagto] = useState('');
  const [observacao, setObservacao] = useState('');

  var usuario = JSON.parse(localStorage.getItem('usuario'));
  var perfil = usuario?.perfil;

  const colDefs = [
    { field: "id", headerName: "ID", sortable: true, filter: true, },
    { field: "instituicao", headerName: "Instituição", flex: 1, sortable: true, filter: true, },
    { field: "mes_ref", headerName: "Mês Ref.", sortable: true, filter: true, },
    { field: "ano_ref", headerName: "Ano Ref.", sortable: true, filter: true, },
    { field: "dt_prev_entr", headerName: "Previsão Entrega", sortable: true, filter: true, },
    { field: "valor_duodecimo", headerName: "Duodécimo", sortable: true, filter: true, },
    { field: "valor_desconto", headerName: "Desconto", sortable: true, filter: true, },
    { field: "valor_pago", headerName: "Pago", sortable: true, filter: true, },
    { field: "dt_pagto", headerName: "Data Pagamento", sortable: true, filter: true, },
    { field: "observacao", headerName: "Observação", flex: 1, sortable: true, filter: true, }
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/pagamentoContas", {
        headers: { perfil: perfil },
      });
      const data = await res.json();
      setRowData(data);
    } catch (err) {
      console.error("Erro ao buscar pagamentos:", err);
    }
  };

  const fetchInstituicoes = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/instituicao", {
        headers: { perfil: "Admin" },
      });
      const data = await res.json();
      setInstitList(data);
    } catch (err) {
      console.error("Erro ao buscar instituições:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInstituicoes();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/pagamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          perfil: perfil,
        },
        body: JSON.stringify({
          id_instit: parseInt(idInstit),
          mes_ref: mesRef,
          ano_ref: parseInt(anoRef),
          dt_prev_entr: dtPrevEntr,
          valor_duodecimo: parseFloat(valorDuodecimo),
          valor_desconto: parseFloat(valorDesconto),
          id_tpdesc: parseInt(idTpdesc),
          valor_pago: parseFloat(valorPago),
          dt_pagto: dtPagto,
          observacao,
        }),
      });
      if (res.ok) {
        setIdInstit('');
        setMesRef('');
        setAnoRef('');
        setDtPrevEntr('');
        setValorDuodecimo('');
        setValorDesconto('');
        setIdTpdesc('');
        setValorPago('');
        setDtPagto('');
        setObservacao('');
        setIsCreateOpen(false);
        fetchData();
      } else {
        console.error("Erro ao registrar pagamento.");
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
          Adicionar Pagamento
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
          <h2 className="text-xl font-bold">Cadastrar Pagamento</h2>

          <div className="flex flex-col gap-1.5">
            <label>Instituição</label>
            <select
              value={idInstit}
              onChange={(e) => setIdInstit(e.target.value)}
              className="border border-[#D5D7DA] rounded-[8px] py-2.5 px-3.5"
            >
              <option value="">Selecione uma instituição</option>
              {institList.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Mês Referência</label>
              <input type="text" value={mesRef} onChange={(e) => setMesRef(e.target.value)} className="border rounded px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Ano Referência</label>
              <input type="number" value={anoRef} onChange={(e) => setAnoRef(e.target.value)} className="border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Previsão Entrega</label>
              <input type="date" value={dtPrevEntr} onChange={(e) => setDtPrevEntr(e.target.value)} className="border rounded px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Data Pagamento</label>
              <input type="date" value={dtPagto} onChange={(e) => setDtPagto(e.target.value)} className="border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Valor Duodécimo</label>
              <input type="number" step="0.01" value={valorDuodecimo} onChange={(e) => setValorDuodecimo(e.target.value)} className="border rounded px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Valor Desconto</label>
              <input type="number" step="0.01" value={valorDesconto} onChange={(e) => setValorDesconto(e.target.value)} className="border rounded px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>ID Tipo Desconto</label>
              <input type="number" value={idTpdesc} onChange={(e) => setIdTpdesc(e.target.value)} className="border rounded px-3 py-2" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Valor Pago</label>
            <input type="number" step="0.01" value={valorPago} onChange={(e) => setValorPago(e.target.value)} className="border rounded px-3 py-2" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Observação</label>
            <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} className="border rounded px-3 py-2" rows={3} />
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
