import styles from './selectCardPage.module.css'

interface HeaderProps {
    state: number | null | undefined; // Предполагаем, что state - это количество оставшихся слов
    openNewSession: () => void; // Функция для сброса
    changeLanguage: () => void; // Функция для смены языка
    language: string | null; // Язык, который используется
    setTouchCardButton: (boolean: boolean) => void
}

function CardsMenu({ state, openNewSession, changeLanguage, language, setTouchCardButton }: HeaderProps){

    return(
        <div className={styles.header}>
            <div>
                <p>Осталось слов: {state}</p>
                <button onClick={openNewSession}>Сброс</button>
            </div>
            <div>
                <button onClick={changeLanguage}>Менять язык</button>
                <p>язык {language}</p>
            </div>
            <div>
                <button onClick={() => setTouchCardButton(false)}>
                    Назад
                </button>
            </div>
        </div>
    )
}

export default CardsMenu