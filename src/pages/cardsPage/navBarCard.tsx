import styles from './selectCardPage.module.css'

interface HeaderProps {
    state: number | null | undefined;
    changeLanguage: () => void;
    language: string | null;
    setTouchCardButton: (boolean: boolean) => void
}

function NavBarCard({ state, changeLanguage, language, setTouchCardButton }: HeaderProps){

    const decrementState = () => {
        if (typeof state === 'number' && state > 0) {
            return state - 1;
        } else {
            return 0;
        }
    };

    const remainingWords = decrementState();

    return(
        <div className={styles.header}>
            <div>
                <p>Осталось слов: {remainingWords}</p>
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

export default NavBarCard