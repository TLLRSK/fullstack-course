import './Notification.css'
const Notification = ({ notification }) => {
    if (!notification) {
        return <span></span>
    }
    
    const { message, type } = notification;

    return (
        <div className={`notification ${type === 'error' ? 'alert' : 'default'}`}>
            { message }
        </div>
    )
}

export default Notification;