import NavBarCard from './navBarCard';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-expect-error
import Loading from '../../components/loading/loading';
import ProgressBar from '../../components/progressBar/progressBar';
import { CardPageProps } from '../../types/cardsTypes';
import NextBTN from '../../assets/btn --next.svg'
import TranslateBTN from '../../assets/btn --translate.svg'
import styles from './selectCardPage.module.css'

function CardPage({ 
    randomWord, 
    handleClickNextWord, 
    language, 
    isTranslation, 
    setIsTranslation, 
    state, 
    changeLanguage, 
    setTouchCardButton 
}: CardPageProps) {

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
                <button 
                    className={styles.button}
                    onClick={() => setTouchCardButton(false)}>
                    Назад
                </button>
            </div> :
            <div>
                {!randomWord ? 
                    <Loading />:
                    <div className={styles.card_container}>
                        <NavBarCard
                            state={state?.length}
                            changeLanguage={changeLanguage}
                            setTouchCardButton={setTouchCardButton}
                        />
                        <div className={styles.choose_language}>{chooseLanguage}</div>
                        <div className={styles.center_block}>
                            <div className={styles.actions}>
                                <img
                                    src={TranslateBTN}
                                    alt="Translate button"
                                    onClick={handleTranslate}
                                    className={styles.actionBTN}
                                />
                                <img
                                    src={NextBTN}
                                    alt="Next button"
                                    onClick={() => handleClickNextWord(id)}
                                    className={styles.actionBTN}
                                />
                            </div>
                            <ProgressBar 
                                remainingWords={remainingWords}
                                state={state?.length} 
                                words={"слов"}
                            />
                        </div>
                    </div>
                }
            </div>}
        </main>
    )
}

export default CardPage