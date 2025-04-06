import { useState } from 'react';
import Resultado from './resultado';
import Entradas from './entradas';

function App() {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [resultado, setResultado] = useState(0);

  return (
    <>
      <Entradas numero1={numero1} numero2={numero2} setNumero1={setNumero1} setNumero2={setNumero2} setResultado={setResultado} />
      <Resultado resultado={resultado} />
    </>
  )
}

export default App
