
import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
        <br />
        <br />
      </div>
    )
}

export default Notification