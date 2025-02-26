import { useState } from 'react';

import styles from './selectCardPage.module.css'

import { HeaderProps } from '../../types/cardsTypes';

const createFlag = (color1: string, color2: string, color3: string): JSX.Element => {
    return (
    <div className={styles.flag}>
      <div className={styles.flagStrip} style={{ backgroundColor: color1 }} />
      <div className={styles.flagStrip} style={{ backgroundColor: color2 }} />
      <div className={styles.flagStrip} style={{ backgroundColor: color3 }} />
    </div>
    );
  };
  

function NavBarCard({ changeLanguage, setTouchCardButton }: HeaderProps){

    const [selectLanguage, setSelectLanguage] = useState(true);

    function handleChangeLanguage(string: string){
        setSelectLanguage(!selectLanguage);
        changeLanguage(string)
    }

    const russianFlag = createFlag('#FFFFFF', '#0039A6', '#D52B1E');
    const germanFlag = createFlag('#000000', '#DD0000', '#FFCE00');

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
                <div className={styles.container}>
                    <div 
                        className={styles.circle} 
                        onClick={() => handleChangeLanguage("rus")}
                        style={{ opacity: selectLanguage ? 0.5 : 1 }}
                    >
                        {russianFlag}
                    </div>
                    <div 
                        className={styles.circle} 
                        onClick={() => handleChangeLanguage("ger")}
                        style={{ opacity: selectLanguage ? 1 : 0.5 }}
                    >
                        {germanFlag}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NavBarCard