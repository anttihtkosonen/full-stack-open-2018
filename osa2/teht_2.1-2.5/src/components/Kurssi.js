import React from 'react'


const Otsikko = ({nimi}) => <h2>{nimi}</h2>

const Sisalto = (props) => {
    const rivit = () => props.kurssi.osat.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)
    return(
        <div>
            {rivit()}
        </div>
    )
}
const Yhteensa = (props) => {
    const tehtavat = props.kurssi.osat.map(osa => osa.tehtavia);
    const summa = tehtavat.reduce((acc, cur) => acc+cur, 0);
  return(
    <p>yhteensä {summa} tehtävää</p>
  )
}

const Kurssi =({kurssi}) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi}  />
        </div>
    )
}

export default Kurssi