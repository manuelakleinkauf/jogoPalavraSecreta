import "./GameOver.css";

const GameOver = ({ reiniciar, pontuacao }) => {
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <h2>
        A sua pontuação foi <span>{pontuacao}</span>
      </h2>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
};

export default GameOver;