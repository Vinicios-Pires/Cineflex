import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";

function Footer() {
  const { idSessao } = useParams();
  const [sessao, setSessao] = useState(null);

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    requisicao.then((resposta) => {
      setSessao(resposta.data);
    });
  }, []);

  if (sessao === null) {
    return <></>;
  }

  return (
    <div className="FooterSessao">
      <div className="img-footer">
        <img src={sessao.movie.posterURL} alt={sessao.movie.title} />
      </div>
      <div>
        <p>{sessao.movie.title}</p>
        <p>
          {sessao.day.weekday} - {sessao.name}
        </p>
      </div>
    </div>
  );
}

export default Footer;
