import { useState } from 'react'

function Entradas({ numero1, numero2, setNumero1, setNumero2, setResultado }) {
    function calcular() {
        let multi = numero1 * numero2;
        setResultado(multi);
    }

    return (
        <>
            <section>
                <article>
                    <input type='number' value={numero1} onChange={e => setNumero1(e.target.value)}></input>
                    <input type='number' value={numero2} onChange={e => setNumero2(e.target.value)}></input>
                </article>
                <article>
                    <button onClick={calcular}>Calcular</button>
                </article>
            </section>
        </>
    )
}

export default Entradas