import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from './pages/Authentication';
import { PainelAdm } from './pages/Dashboard/PainelAdm';
import { Layout } from './pages/Dashboard/layout';
import { ModalTest } from "./pages/ModalTest";
import { Instituicao } from "./pages/Tables/Instituicao";
import { Subseccional } from "./pages/Tables/Subseccional";
import { Demonstrativo } from "./pages/Tables/Demonstrativo";
import { Transparencia } from "./pages/Tables/Transparencia";
import { BalanceteCFOAB } from "./pages/Tables/BalanceteCFOAB";
import { PagamentoContas } from "./pages/Tables/PagamentoContas";
import { PrestacaoSubseccional } from "./pages/Tables/PrestaçãoSubseccional";
import { PrivateRoute } from "./components/PrivateRoute";
import { BaseOrcamentaria } from "./pages/Tables/BaseOrcamentaria";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Authentication />} />
        <Route path="modal" element={<ModalTest/>} />
      
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/administrativo" element={<PainelAdm />} />
            <Route path="/tabelas/Instituição" element={<Instituicao />} />
            <Route path="/tabelas/Subseccional" element={<Subseccional />} />
            <Route path="/tabelas/Demonstrativo" element={<Demonstrativo />} />
            <Route path="/tabelas/Transparência" element={<Transparencia />} />
            <Route path="/tabelas/BalanceteCFOAB" element={<BalanceteCFOAB />} />
            <Route path="/tabelas/PagamentoContas" element={<PagamentoContas />} />
            <Route path="/tabelas/PrestaçãoSubseccional" element={<PrestacaoSubseccional />} />
            <Route path="/tabelas/BaseOrçamentaria" element={<BaseOrcamentaria />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
