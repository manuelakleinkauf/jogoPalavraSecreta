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

const qtChances = 4

function App() {
  const [etapaJogo, setEtapaJogo] = useState(etapas[0].name)
  const [palavras] = useState(listaPalavras)
  
  const [palavraEscolhida, setPalavraEscolhida] = useState("")
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
  const [letras, setLetras] = useState([])

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [ chances, setChances] = useState(qtChances)
  const [pontuacao, setPontuacao] = useState(0)

  const letraECategoriaEscolhida =  useCallback(() => {
    //categoria aleatoria
    const categorias = Object.keys(palavras)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)] 

    //palavra aleatoria
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

    return {palavra, categoria}
  }, [palavras])

  //comeca o jogo
  const comecaJogo = useCallback(() =>{
    //limpar todas as letras
    limparEtapasLetras()

    //categoria e palavra
    const {palavra, categoria} = letraECategoriaEscolhida()

    //transformando a palavra em letras
    let letrasPalavra = palavra.split("")
    letrasPalavra = letrasPalavra.map((l) => l.toLowerCase())
    //setar os estados
    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(letrasPalavra)

    setEtapaJogo(etapas[1].name)
  }, [letraECategoriaEscolhida])
  
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
      setChances((chancesAtuais) => chancesAtuais - 1)
    }
  }

  const limparEtapasLetras = () => {
    setLetrasAdivinhadas([])
    setLetrasErradas([])
  }

  //checar se tentativas terminaram
  useEffect(()=> {
    if(chances <= 0){
      //resetar tudo
      limparEtapasLetras()

      setEtapaJogo(etapas[2].name)
    }
  }, [chances])

  //checar condi????o de vit??ria
  useEffect(() => {
    const letrasUnicas = [...new Set(letras)]
    //condi????o de vitoria
    if(letrasAdivinhadas.length === letrasUnicas.length){
      //adicionar pontuacao
      setPontuacao((pontuacaoAtual) => pontuacaoAtual += 100)

      //recome??ar o jogo com nova palavra
      comecaJogo()
    }

  },[letrasAdivinhadas, letras, comecaJogo])


  const reiniciar = () => {
    setPontuacao(0)
    setChances(qtChances)

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
      {etapaJogo === 'final' && <GameOver reiniciar={reiniciar} pontuacao={pontuacao}/>}
    </div>
  );
}

export default App;
