import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";

function Footer() {
  const { idFilme } = useParams();
  const [filmeEscolhido, setFilmeEscolhido] = useState(null);

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );
    requisicao.then((resposta) => {
      setFilmeEscolhido(resposta.data);
    });
  }, []);

  if (filmeEscolhido === null) {
    return <></>;
  }

  return (
    <div className="Footer">
      <div>
        <img src={filmeEscolhido.posterURL} alt={filmeEscolhido.title} />
      </div>
      <p>{filmeEscolhido.title}</p>
    </div>
  );
}

export default Footer;
