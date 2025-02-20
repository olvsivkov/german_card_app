import NavBarCard from './navBarCard';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-expect-error
import Loading from '../../components/loading/loading';

import { CardPageProps } from '../../types/cardsTypes';

import styles from './selectCardPage.module.css'

function CardPage({ randomWord, handleClickNextWord, language, isTranslation, setIsTranslation, state, changeLanguage, setTouchCardButton }: CardPageProps) {

    if (!randomWord) return <Loading />;

    const { ger, id, rus } = randomWord;

    function getTranslatedText(language: string | null, isTranslation: boolean, ger: string, rus: string ) {
        if (language === "ger") {
            return isTranslation ? <h2>{rus}</h2> : <h2>{ger}</h2>;
        } else {
            return isTranslation ? <h2>{ger}</h2> : <h2>{rus}</h2>;
        }
    }

    const chooseLanguage = getTranslatedText(language, isTranslation, ger, rus);

    function handleTranslate(){
        setIsTranslation(!isTranslation)
    }

    
    const decrementState = () => {
        if (state?.length !== undefined && state?.length > 0) {
            return state?.length - 1;
        } else {
            return 0;
        }
    };

    const remainingWords = decrementState();

    return(
        <main>
            {state?.length === 1 ? 
            <div>
                <p>Карточки закончились.</p>
                <button onClick={() => setTouchCardButton(false)}>
                    Назад
                </button>
            </div> :
            <div>
                {!randomWord ? 
                    <Loading />:
                    <div>
                        <NavBarCard
                            state={state?.length}
                            language={language}
                            changeLanguage={changeLanguage}
                            setTouchCardButton={setTouchCardButton}
                        />
                        <div className={styles.center_block}>
                            <div className={styles.choose_language}>{chooseLanguage}</div>
                            <div className={styles.actions}>
                                <div className={styles.translate_button} onClick={handleTranslate}>Перевод</div>
                                <div className={styles.next_button} onClick={() => handleClickNextWord(id)}>Далее</div>
                            </div>
                        </div>
                        <div>
                            <p>Осталось слов: {remainingWords}</p>
                        </div>
                    </div>
                }
            </div>}
        </main>
    )
}

export default CardPage