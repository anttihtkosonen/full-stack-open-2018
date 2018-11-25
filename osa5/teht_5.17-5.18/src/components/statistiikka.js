import React from 'react'

const Statistiikka = ({ good, ok, bad, zero }) => {

    const palautteita = good + ok + bad
    const average = (good - bad)/palautteita
    const positives= good/palautteita
    
    if (palautteita === 0) {
      return (
        <div>
          <h2>statistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }
  
    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{positives}</td>
            </tr>
          </tbody>
        </table>
  
        <button onClick={zero}>nollaa tilasto</button>
      </div >
    )
}

export default Statistiikka