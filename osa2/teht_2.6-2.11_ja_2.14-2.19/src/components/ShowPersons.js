
import React from 'react';


const ShowPersons = ({persons, search, filter}) => {

    const rivit = persons.filter(person=>search(person)).map(person => 
      <tr key={person.id}>
        <td>{person.name}</td> 
        <td>{person.number}</td>
       </tr>
      )
    
    return (
      <div>
        <table>
          {rivit}
        </table>
      </div>
      
    )
    }


export default ShowPersons