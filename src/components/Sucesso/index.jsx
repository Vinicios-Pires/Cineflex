import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

function Sucesso() {
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <h1 className="sucesso">Pedido feito com sucesso!</h1>
      <div className="Sucesso">
        <div className="filme-sessao">
          <h2>Filme e sessão</h2>
          <p>{state.data.movie.title}</p>
          <p>{state.data.day.date} {state.data.name}</p>
        </div>
        <div className="filme-ingressos">
          <h2>Ingressos</h2>
          {state.assentos.map((a) => <p>Assento {a}</p>)}
        </div>
        <div className="filme-comprador">
          <h2>Comprador</h2>
          <p>Nome: {state.nome}</p>
          <p>CPF: {state.cpf}</p>
        </div>
      </div>
      <div className="botao">
        <Link to={`/`}>
          <button>Voltar pra Home</button>
        </Link>
      </div>
    </>
  );
}

export default Sucesso;
