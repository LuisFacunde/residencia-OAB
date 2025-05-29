import React, { useEffect, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Modal1 } from "../../../components/Modal1";
import { ModalButtons } from "../../../components/ModalButtons";
import { ModalIcon } from "../../../components/ModalIcon";
import demonstrativoIcon from "../../../assets/painelIcon.svg";

ModuleRegistry.registerModules([AllCommunityModule]);

export const BaseOrcamentaria = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form fields
  const [lancto, setLancto] = useState('');
  const [valor, setValor] = useState('');
  const [dtDocto, setDtDocto] = useState('');
  const [dtLancto, setDtLancto] = useState('');
  const [ano, setAno] = useState('');
  const [tipo, setTipo] = useState('Despesa');

  var usuario = JSON.parse(localStorage.getItem('usuario'));
  var perfil = usuario?.perfil;

  const colDefs = [
    { field: "lancto", headerName: "Lançamento", flex: 1, sortable: true, filter: true },
    { field: "valor", headerName: "Valor", sortable: true, filter: true },
    { field: "dt_docto", headerName: "Data Documento", sortable: true, filter: true },
    { field: "dt_lancto", headerName: "Data Lançamento", sortable: true, filter: true },
    { field: "ano", headerName: "Ano", sortable: true, filter: true },
    { field: "tipo", headerName: "Tipo", sortable: true, filter: true }
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/orcamentos", {
        headers: { perfil },
      });
      const data = await res.json();
      setRowData(data);
    } catch (err) {
      console.error("Erro ao buscar orçamentos:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    console.log(lancto,valor,dtDocto,dtLancto,ano,tipo);
    try {
      const res = await fetch("http://127.0.0.1:5000/orcamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          perfil: perfil,
        },
        body: JSON.stringify({
          id_lancto: 1,
          lancto,
          valor: parseFloat(valor),
          dt_docto: dtDocto,
          dt_lancto: dtLancto,
          ano: parseInt(ano),
          tipo
        }),
      });

      if (res.ok) {
        setLancto('');
        setValor('');
        setDtDocto('');
        setDtLancto('');
        setAno('');
        setTipo('Despesa');
        setIsCreateOpen(false);
        fetchData();
      } else {
        console.error("Erro ao registrar lançamento.");
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
          Adicionar Lançamento
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
          <h2 className="text-xl font-bold">Cadastrar Lançamento</h2>

          <div className="flex flex-col gap-1.5">
            <label>Descrição do Lançamento</label>
            <input
              type="text"
              value={lancto}
              onChange={(e) => setLancto(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Valor</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Data Documento</label>
              <input
                type="date"
                value={dtDocto}
                onChange={(e) => setDtDocto(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Data Lançamento</label>
              <input
                type="date"
                value={dtLancto}
                onChange={(e) => setDtLancto(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label>Ano</label>
              <input
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>
            </div>
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
