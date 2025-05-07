import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from './pages/Authentication';
import { Funcionarios } from './pages/Dashboard/Funcionarios';
import { Layout } from './pages/Dashboard/layout';


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Authentication/>}></Route>

        <Route element={<Layout/>}>
          <Route path='/funcionarios' element={<Funcionarios/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
