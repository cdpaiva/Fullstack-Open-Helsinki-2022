const Notification = ({ message, status }) => {
    if (message && status === 'error') {
        return <div className='notification-error'>
            {message}
        </div>
    }
    if (message && status === 'success') {
        return <div className='notification-success'>
            {message}
        </div>
    }
}

export default Notification