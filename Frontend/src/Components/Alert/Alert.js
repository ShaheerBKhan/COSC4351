import styles from './Alert.module.css';

export const Alert = ({alertClass, messages}) => {
    return (
        <div className={styles[alertClass]}>
            { messages.map((message, index) => {
                return (
                    <div key={index}>
                        <p>{ message }</p>
                        {
                            // eslint-disable-next-line
                        index+1 == messages.length ? null : <hr/>}
                    </div>
                )
            })}
        </div>
    )
}
