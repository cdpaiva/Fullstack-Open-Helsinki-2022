import PropTypes from 'prop-types'

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

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}

export default Notification