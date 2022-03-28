import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./style.css";

function Filmes() {
  const [filmes, setFilmes] = useState(null);
  useEffect(() => {
    const requisicao = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    requisicao.then((resposta) => {
      setFilmes(resposta.data);
    });
  }, []);

  return (
    <div className="Filmes">
      <h1>Selecione o filme</h1>
      <ul>
        {filmes?.map((filme) => (
          <Link key={filme.id} to={`/sessoes/${filme.id}`}>
            <li>
              <div>
                <img src={filme.posterURL} alt={filme.title} />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Filmes;
