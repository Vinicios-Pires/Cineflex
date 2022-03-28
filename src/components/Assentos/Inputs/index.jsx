import { useState } from "react";
import "./style.css";

function Inputs() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  function ComprarAssento(event) {
    event.preventDefault();

    const requisicao = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      {
        ids: [],
        name: nome,
        cpf: cpf,
      }
    );
  }

  return (
    <>
      <form onSubmit={ComprarAssento}>
        <div className="Inputs">
          <p>Nome do comprador:</p>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome..."
            required
          />
          <p>CPF do comprador:</p>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu cpf..."
            required
          />
        </div>
        <div className="Botao">
          <button type="submit">Reservar assento(s)</button>
        </div>
      </form>
    </>
  );
}

export default Inputs;
