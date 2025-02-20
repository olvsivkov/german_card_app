import styles from './selectCardPage.module.css'

import { HeaderProps } from '../../types/cardsTypes';

function NavBarCard({ changeLanguage, language, setTouchCardButton }: HeaderProps){

    return(
        <div className={styles.nav_bar}>
            <div>
                <button
                    className={styles.button}
                    onClick={() => setTouchCardButton(false)}>
                    Назад
                </button>
            </div>
            <div>
                <button
                    className={styles.button} 
                    onClick={changeLanguage}>Менять язык
                </button>
                <p>язык {language}</p>
            </div>
        </div>
    )

}

export default NavBarCard