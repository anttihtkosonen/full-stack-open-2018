
import React from 'react';
import '../index.css'


const Notification = ({ message }) => {
    if (message !== null) {
      const cssType = message.type === 'error' ? 'error' : 'info'
      return (
        <div className = {cssType}>
          {message.body}
        </div>
      )
    }

    return (
      <div></div>
      )
}

export default Notification