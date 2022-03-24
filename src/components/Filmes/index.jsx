import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

function Filmes() {
  const [filmes, setFilmes] = useState(null);
  console.log(filmes);
  useEffect(() => {
    const requisicao = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    requisicao.then((resposta) => {
      setFilmes(resposta.data);
    });
  }, []);

  if (filmes === null) {
    return <></>;
  }

  return (
    <div className="Filmes">
      <h1>Selecione o filme</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <div>
              <img key={filme.id} src={filme.posterURL} alt={filme.title} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filmes;
