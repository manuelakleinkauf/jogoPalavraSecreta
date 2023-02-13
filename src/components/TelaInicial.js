import './TelaInicial.css'

const TelaInicial = ({ comecaJogo }) => {
  return (
    <div className="inicio">
        <h1>Secred Word</h1>
        <p>Clique no botão abaixo para começar o jogo</p>
        <button onClick={comecaJogo}>Começar o Jogo</button>
    </div>
  )
}

export default TelaInicial