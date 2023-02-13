import './GameOver.css';

const GameOver = ({reiniciar}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={reiniciar}>Resetar Jogo</button>
    </div>
  )
}

export default GameOver