import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Footer from "./Footer";

function Sessoes() {
  const { idSessao } = useParams();
  const [sessao, setSessao] = useState(null);
  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idSessao}/showtimes`
    );
    requisicao.then((resposta) => {
      setSessao(resposta.data.days);
    });
  }, []);

  if (sessao === null) {
    return <></>;
  }

  return (
    <div className="Sessoes">
      <h1>Selecione o horário</h1>
      <div>
        {sessao.map((s) => (
          <div key={s.id}>
            <p>
              {s.weekday} - {s.date}
            </p>
            <div className="botoes">
              <button>{s.showtimes[0].name}</button>
              <button>{s.showtimes[1].name}</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Sessoes;
