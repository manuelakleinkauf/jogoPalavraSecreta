import './Jogo.css'
import { useState, useRef } from 'react'

const Jogo = ({  
  chances, 
  pontuacao, 
  letras, 
  letrasErradas, 
  letrasAdivinhadas, 
  categoriaEscolhida, 
  palavraEscolhida, 
  verificaLetra
}) => {
  const[letra, setLetra] = useState("")
  const letraInputRef = useRef(null)
  const handleSubmit = (e) =>{
    e.preventDefault();
    verificaLetra(letra)
    setLetra("")
    letraInputRef.current.focus();
  }

  return (
    <div className="jogo">
      <p className="pontos">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="dica">Dica: <span>{categoriaEscolhida}</span></h3>
      <p>Você ainda tem {chances} tentativas!</p>
      <div className="containerPalavra">
        {letras.map((letra, i) =>
          letrasAdivinhadas.includes(letra) ? (
            <span key={i} className="letra">
              {letra}
            </span>
          ):(
            <span key={i} className="quadradoBranco"></span>
          )
        )}
      </div>
      <div className="containerLetra">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" 
          name="letra" 
          maxLength="1" 
          required 
          onChange={(e) => setLetra(e.target.value)} 
          value={letra}
          ref={letraInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="containerLetrasErradas">
        <p>Letras já utilizadas: {letrasErradas.map((letra,i) =>(
          <span key={i}>{letra}, </span>
        ))}
        </p>
        
      </div>
    </div>
  )
}

export default Jogo