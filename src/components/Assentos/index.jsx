import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ExemplosAssentos from "./ExemplosAssentos";
import Inputs from "./Inputs";
import Footer from "./Footer";

import "./style.css";

function Assentos() {
  const [assentosEscolhidos, setAssentoEscolhidos] = useState([]);
  console.log(assentosEscolhidos);
  const { idSessao } = useParams();
  const [sessaoEscolhida, setSessaoEscolhida] = useState([]);
  console.log(sessaoEscolhida);
  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    requisicao.then((resposta) => {
      setSessaoEscolhida(resposta.data.seats);
      console.log(resposta.data);
    });
  }, []);

  if (sessaoEscolhida.length === 0) {
    <></>;
  }

  function AssentoSelecionado(e) {
    const idAssento = e.target.classList[0];
    if (assentosEscolhidos.includes(idAssento)) {
      let buscar = idAssento;
      let indice = assentosEscolhidos.indexOf(buscar);
      assentosEscolhidos.splice(indice, 1);
      setAssentoEscolhidos([...assentosEscolhidos]);
      return;
    }

    setAssentoEscolhidos([...assentosEscolhidos, idAssento]);
    console.log(e.target.classList[0]);
  }

  function Indisponivel() {
    alert("Nao esta disponivel")
  }

  return (
    <div className="Assentos">
      <h1>Selecione o horário</h1>
      <div className="assentos">
        {sessaoEscolhida.map((s) =>
          s.isAvailable ? (
            <div
              onClick={AssentoSelecionado}
              key={s.id}
              className={`${s.id} ${
                assentosEscolhidos.includes(`${s.id}`)
                  ? "selecionado"
                  : "disponivel"
              }`}
            >
              {s.name}
            </div>
          ) : (
            <div onClick={Indisponivel} key={s.id} className="indisponivel">
              {s.name}
            </div>
          )
        )}
      </div>
      <ExemplosAssentos />
      <Inputs />
      <Footer />
    </div>
  );
}

export default Assentos;
