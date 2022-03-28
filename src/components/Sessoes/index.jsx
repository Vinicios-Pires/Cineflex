import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Footer from "./Footer";

function Sessoes() {
  const { idFilme } = useParams();
  const [filme, setFilme] = useState(null);
  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );
    requisicao.then((resposta) => {
      setFilme(resposta.data.days);
    });
  }, []);

  return (
    <div className="Sessoes">
      <h1>Selecione o horário</h1>
      <div>
        {filme?.map((f) => (
          <div key={f.id}>
            <p>
              {f.weekday} - {f.date}
            </p>
            <div className="botoes">
              <Link to={`/assentos/${f.showtimes[0].id}`}>
                <button>{f.showtimes[0].name}</button>
              </Link>
              <Link to={`/assentos/${f.showtimes[1].id}`}>
                <button>{f.showtimes[1].name}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Sessoes;
