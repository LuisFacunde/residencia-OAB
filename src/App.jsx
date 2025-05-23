import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from './pages/Authentication';
import { PainelAdm } from './pages/Dashboard/PainelAdm';
import { Layout } from './pages/Dashboard/layout';
import { ModalTest } from "./pages/ModalTest";
// import { TabelaGenerica } from './pages/Dashboard/TabelaGenerica';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Authentication />} />

        {/* pagina para teste de modal - Coraline. */}
        <Route path="modal" element={<ModalTest/>} />

        <Route element={<Layout />}>
          <Route path="/administrativo" element={<PainelAdm />} />
          <Route path="/tabelas/:nome" element="teste" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
