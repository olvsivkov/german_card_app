import CardsMenu from './cardsMenu';

import styles from './cardPage.module.css'

interface GermanCard {
    ger: string;
    id: number;
    rus: string;
}

interface CardPageProps {
    randomWord: GermanCard | null;
    handleClickNextWord: (id: number) => void;
    language: string | null;
    isTranslation: boolean;
    setIsTranslation: (boolean: boolean) => void;
    state: GermanCard[] | null | undefined;
    openNewSession: () => void;
    changeLanguage: () => void;
    setTouchCardButton: (boolean: boolean) => void

}

function CardPage({ randomWord, handleClickNextWord, language, isTranslation, setIsTranslation, state, openNewSession, changeLanguage, setTouchCardButton }: CardPageProps) {

    if (!randomWord) return <p>Загрузка...</p>;

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

    return(
        <div>
            <CardsMenu
                state={state?.length}
                language={language}
                openNewSession={openNewSession}
                changeLanguage={changeLanguage}
                setTouchCardButton={setTouchCardButton}
            />
            <p>Cards</p>
            <div className={styles.parent}>
                <div className ={styles.left}>
                    <div className ={styles.top}>
                        {chooseLanguage}
                    </div>
                    <div className ={styles.bottom} onClick={handleTranslate}>Перевод</div>
                </div>
                <div className ={styles.right} onClick={() => handleClickNextWord(id)}>Далее</div>
            </div>
        </div>
    )
}

export default CardPage