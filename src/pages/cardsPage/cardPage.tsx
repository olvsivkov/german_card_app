import NavBarCard from './navBarCard';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-expect-error
import Loading from '../../components/loading/loading';

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
    changeLanguage: () => void;
    setTouchCardButton: (boolean: boolean) => void
}

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
                        <p>Cards</p>
                        <div>
                            <div>
                                <div>
                                    {chooseLanguage}
                                </div>
                                <div onClick={handleTranslate}>Перевод</div>
                            </div>
                            <div onClick={() => handleClickNextWord(id)}>Далее</div>
                        </div>
                    </div>
                }
            </div>}
        </main>
    )
}

export default CardPage