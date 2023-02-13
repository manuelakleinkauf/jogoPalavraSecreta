//CSS
import './App.css';

//React
import {useCallback, useEffect, useState} from "react"

//data
import {listaPalavras} from './data/palavras'

//components
import TelaInicial from './components/TelaInicial';
import GameOver from './components/GameOver';
import Jogo from './components/Jogo';

const etapas = [
  {id: 1, name:"inicio"},
  {id: 2, name:"jogo"},
  {id: 3, name:"final"},
]

function App() {
  const [etapaJogo, setEtapaJogo] = useState(etapas[0].name)
  const [palavras] = useState(listaPalavras)
  
  const [palavraEscolhida, setPalavraEscolhida] = useState("")
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
  const [letras, setLetras] = useState([])

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [ chances, setChances] = useState(4)
  const [pontuacao, setPontuacao] = useState(0)

  const letraECategoriaEscolhida = () => {
    //categoria aleatoria
    const categorias = Object.keys(palavras)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)] 
    

    console.log(categoria)

    //palavra aleatoria
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

    
    console.log(palavra)

    return {palavra, categoria}
  }

  //comeca o jogo
  const comecaJogo = () =>{
    //categoria e palavra
    const {palavra, categoria} = letraECategoriaEscolhida()

    //transformando a palavra em letras
    let letrasPalavra = palavra.split("")
    letrasPalavra = letrasPalavra.map((l) => l.toLowerCase())
    console.log(palavra, categoria)
    console.log(letrasPalavra)
    //setar os estados
    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(letrasPalavra)

    setEtapaJogo(etapas[1].name)
  }
  
  const verificaLetra = (letra) =>{
    const padronizarLetra = letra.toLowerCase()
    //ver se a letra ja foi colocada
    if(letrasAdivinhadas.includes(padronizarLetra) || letrasErradas.includes(padronizarLetra)){
      return
    }

    // colocar a letra na palavra ou tirar uma chance
    if(letras.includes(padronizarLetra)){
      setLetrasAdivinhadas((atualLetrasAdivinhadas) =>[
        ...atualLetrasAdivinhadas,
        padronizarLetra
      ])
    }else{
      setLetrasErradas((atualLetrasErradas) =>[
        ...atualLetrasErradas,
        padronizarLetra
      ])
    }
  }
  console.log(letrasAdivinhadas)
  console.log(letrasErradas)

  const reiniciar = () => {
    setEtapaJogo(etapas[0].name)
  }


  return (
    <div className="App">
      {etapaJogo === 'inicio' && <TelaInicial comecaJogo={comecaJogo}/>}
      {etapaJogo === 'jogo' && 
      <Jogo
       verificaLetra={verificaLetra} 
       palavraEscolhida={palavraEscolhida} 
       categoriaEscolhida={categoriaEscolhida}
       letrasAdivinhadas={letrasAdivinhadas}
       letrasErradas={letrasErradas}
       letras={letras}
       pontuacao={pontuacao}
       chances={chances}
       />}
      {etapaJogo === 'final' && <GameOver reiniciar={reiniciar}/>}
    </div>
  );
}

export default App;
