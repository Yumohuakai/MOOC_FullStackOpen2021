import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  } else {
    return (
      <div className={notification.styleType}>
        {notification.message}
      </div>
    )
  }
}

export default Notification