import React from 'react';
import axios from 'axios';
import ShowCountries from './components/ShowCountries'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          countries: [],
          filter: ''
        }
      }

    componentDidMount() {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.setState({
              countries: response.data
          })
        })
    }

    
    countrySearcher = (country) => {
        return (this.state.filter.length === 0 || country.name.match(new RegExp(this.state.filter, 'i')))
    }

    handleFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    onClickHandler = (country) => {
        console.log('clicked')
        this.setState({
            filter: country.name
        })
    }



    render() {
        return (
            <div>
                Find countries: <input value={this.state.filter} onChange={this.handleFilter} />
                <ShowCountries countries={this.state.countries} countrySearcher={(input)=>this.countrySearcher(input)} onClickHandler={this.onClickHandler} />
            </div>
        )
    }
}

export default App;