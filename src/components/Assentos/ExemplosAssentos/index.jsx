import "./style.css"

function ExemplosAssentos() {
  return (
    <div className="exemplos-assentos">
      <div>
        <div className="exemplo-assento selecionado"></div>
        <p>Selecionado</p>
      </div>

      <div>
        <div className="exemplo-assento disponivel"></div>
        <p>Disponível</p>
      </div>

      <div>
        <div className="exemplo-assento indisponivel"></div>
        <p>Indisponível</p>
      </div>
    </div>
  );
}

export default ExemplosAssentos;