import React from 'react'
import ReactDOM from 'react-dom'

const Button =({handleClick, teksti}) => (
    <button onClick={handleClick}>{teksti}</button>
)


const Statistic = ({ teksti, arvo }) => (
    <tr><td>{teksti}</td><td>{arvo}</td></tr>
)

const Statistics = ({hyva, neutraali, huono}) => {
    const summa = hyva+neutraali+huono;
    let keskiarvo;
    let positiivisia;
    
    if(summa > 0) {
        keskiarvo = ((hyva-huono)/(summa)).toFixed(1);
        positiivisia = ((hyva/summa)*100).toFixed(1);
        return (
//            console.log('if'),
            <table>
                <tbody>
                    <Statistic teksti={"Hyvä"} arvo={hyva} />
                    <Statistic teksti={"Neutraali"} arvo={neutraali} />
                    <Statistic teksti={"Huono"} arvo={huono} />
                    <Statistic teksti={"Keskiarvo"} arvo={keskiarvo} />
                    <Statistic teksti={"Positiivisia"} arvo={positiivisia+" %"} />
                </tbody>
            </table>
        );
    }
    return (
        <div>
                <p>Yhtään palautetta ei vielä ole annettu</p>
        </div>
    );
}

const Otsikko = ({text}) => (<h2>{text}</h2>)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hyva: 0,
          neutraali: 0,
          huono:0
        }
      } 
      
    lisaaPalaute = (palaute) =>{
        return () => this.setState({[palaute]: this.state[palaute] +1})
    }


    render() {
        return (
            <div>
                <Otsikko text={"Anna palautetta"} />
                <div> 
                    <Button handleClick={this.lisaaPalaute('hyva')} teksti="Hyvä" />
                    <Button handleClick={this.lisaaPalaute('neutraali')} teksti="Neutraali" />
                    <Button handleClick={this.lisaaPalaute('huono')} teksti="Huono" />
                </div>
                <Otsikko text={"Statistiikka"} />
                <Statistics hyva={this.state.hyva} 
                            neutraali={this.state.neutraali}
                            huono={this.state.huono} />
            </div>
        )
    }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
