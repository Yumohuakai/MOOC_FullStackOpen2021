const Notification = ({ message, messageT}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={messageT}>
        {message}
      </div>
    )
  }

  export default Notification