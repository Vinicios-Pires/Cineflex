import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filmes from "../Filmes";
import Header from "../Header";
import Sessoes from "../Sessoes";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Filmes />} />
          <Route path="/sessoes/:idSessao" element={<Sessoes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
