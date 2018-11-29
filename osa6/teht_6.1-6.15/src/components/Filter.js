import React from 'react'
import { connect } from 'react-redux'
import { defineFilter } from '../reducers/filterReducer'


class Filter extends React.Component {
  handleChange = (event) => {
    console.log(event.target.value)
    this.props.defineFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }
    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default connect(null, { defineFilter })(Filter)