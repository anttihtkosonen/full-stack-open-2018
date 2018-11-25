
import React from 'react'
import Statistiikka from './components/statistiikka'

class App extends React.Component {
klik = (nappi) => () => {
    this.props.store.dispatch({ type: nappi})
}

render() {
    const storeNow = this.props.store.getState()
    return (
    <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka 
        good={storeNow.good} 
        ok={storeNow.ok} 
        bad={storeNow.bad} 
        zero={this.klik('ZERO')}
        />
    </div>
    )
}
}

  export default App