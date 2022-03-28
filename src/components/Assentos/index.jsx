import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import ExemplosAssentos from "./ExemplosAssentos";
// import Inputs from "./Inputs";
import Footer from "./Footer";

import "./style.css";

function Assentos() {
  const { idSessao } = useParams();
  const [assentosEscolhidos, setAssentoEscolhidos] = useState([]);
  const [sessaoEscolhida, setSessaoEscolhida] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  // Nao estou conseguindo entender como validar inputs pelo react
  function validar() {
    !(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) ? "cpf incorreto" : ""
    if (assentosEscolhidos.length === 0) {
      alert("Voce precisa selecionar assentos")
    }
  }



  function ComprarAssento(event) {
    event.preventDefault();

    const promessa = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      {
        ids: assentosEscolhidos,
        name: nome,
        cpf: cpf,
      }
    );

    promessa.then((resposta) => {
      console.log("foi enviado");
      navigate("/sucesso", {
        state: {
          nome: nome,
          cpf: cpf,
          data: data,
          assentos: assentosEscolhidos,
        },
      });
    });
    promessa.catch((err) => {
      console.log("nao foi enviado");
    });
  }

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    requisicao.then((resposta) => {
      setSessaoEscolhida(resposta.data.seats);
      setData(resposta.data);
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
  }

  function Indisponivel() {
    alert("Esse assento não está disponível");
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
              className={`${s.name} ${
                assentosEscolhidos.includes(`${s.name}`)
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
          <button onClick={() => validar()} type="submit">Reservar assento(s)</button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Assentos;
