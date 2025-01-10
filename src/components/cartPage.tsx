import styles from './cardPage.module.css'

function CardPage() {
    return(
        <div>
            <p>Cards</p>
            <div className={styles.parent}>
                <div className ={styles.left}>
                    <div className ={styles.top}>Верхний див (80%)</div>
                    <div className ={styles.bottom}>Нижний див (20%)</div>
                </div>
                <div className ={styles.right}>Правый див (20%)</div>
            </div>
        </div>
    )
}

export default CardPage