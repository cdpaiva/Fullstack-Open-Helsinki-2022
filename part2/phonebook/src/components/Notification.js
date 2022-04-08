const Notification = ({ message }) => {
    if (!message) {
        return
    }
    return (
        <div className='errorMessage'>
            <p>{message}</p>
        </div>
    )
}

export default Notification