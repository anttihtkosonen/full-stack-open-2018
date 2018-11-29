import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    //const notification = this.props.store.getState().notification
    const notification = this.props.notification
    console.log('this.props.notification: ',this.props.notification)
    if (notification.length === 0) {
      return ''
    }

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
