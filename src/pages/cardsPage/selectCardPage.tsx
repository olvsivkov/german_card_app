import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardPage from "./cardPage";
import styles from "./selectCardPage.module.css"; 

interface GermanCard {
    id: number;
    ger: string;
    rus: string;
}

interface ItemCardProps {
    cardName: string;
    handleClickCards: (cardName: string) => void;
}

interface CardData {
    [key: string]: GermanCard[];
  }

function ItemCard({ cardName, handleClickCards }: ItemCardProps) {
    return( 
        <div>
            <button onClick={() =>handleClickCards(cardName)}>{cardName}</button>
        </div>
    )
}

function SelectCardPage () {

    const navigate = useNavigate();

    const [state, setState] = useState<GermanCard[] | null>(null);
    const [jsonData, setJsonData] = useState<CardData | null>(null);
    const [randomWord, setRandomWord] = useState<GermanCard | null>(null);
    const [language, setLanguage] = useState<string | null>("ger")
    const [isTranslation, setIsTranslation] = useState(false)
    const [lastWordId, setLastWordId] = useState<number | null>(null); //!!!
    const [cardsTitles, setCardsTitles] = useState<string[]>([])
    const [touchCardButton, setTouchCardButton] = useState(false)

    useEffect(
        () => {
            fetchData();
        }, []
    );

    /*async function fetchData() {
        const url = 'https://olvsivkov.github.io/german_cards/api/data.json';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            
            const jsonData = await response.json();
            
            // Объединяем все слова из разных разделов в один массив
            const allWords = [];

            console.log(jsonData)

            // Слова и фразы
            if (jsonData["Слова и фразы"]) {
                allWords.push(...jsonData["Слова и фразы"]);
            }

            // Популярные глаголы
            if (jsonData["Популярные глаголы"]) {
                allWords.push(...jsonData["Популярные глаголы"]);
            }

            // Месяцы
            if (jsonData["Месяцы"]) {
                allWords.push(...jsonData["Месяцы"]);
            }

            // Слова отрицания
            if (jsonData["Слова отрицания"]) {
                allWords.push(...jsonData["Слова отрицания"]);
            }

            // Популярные вопросы
            if (jsonData["Популярные вопросы"]) {
                allWords.push(...jsonData["Популярные вопросы"]);
            }

            // Установка состояния с объединённым массивом слов
            setState(allWords);
            // Выбор случайного слова
            setRandomWord(getRandomWord(allWords)); 
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }   */

    async function fetchData() {
        const url = 'https://olvsivkov.github.io/german_cards/api/data.json';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            
            const jsonData = await response.json();

            const allKeys = Object.keys(jsonData);
              setCardsTitles(allKeys);
              setJsonData(jsonData)
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }
    

    function getRandomWord(dataArray: GermanCard[]) {
        if (!dataArray || dataArray.length === 0) {
            return null;
        }
        
        let randomIndex;
        let selectedWord;

        do {
            randomIndex = Math.floor(Math.random() * dataArray.length);
            selectedWord = dataArray[randomIndex];
        } while (selectedWord.id === lastWordId); 

        return selectedWord;
    }

    function handleClickNextWord(id: number) {
        if(state){
            deleteLastRandomWord(id);
            const word = getRandomWord(state)
            if (word) {
                setRandomWord(word);
                setLastWordId(word.id); 
                setIsTranslation(false);
            } else {
                console.log("Нет доступных слов");
            }
        }
    }

    function deleteLastRandomWord(wordID: number) {
        if (state) { 
            const newArray = state.filter(elem => elem.id !== wordID);
            setState(newArray.length > 0 ? newArray : null);
        }
    }

    function handleClickCards(key: string | null | undefined) {
        if (!jsonData || !key) return; 
        setTouchCardButton(true);
        setState(jsonData[key]);
        setRandomWord(getRandomWord(jsonData[key])); 
    }

    function openNewSession(){
        fetchData()
        setLastWordId(null); 
    }

    function changeLanguage(){
        if(language === "ger") setLanguage("rus")
        else setLanguage("ger")
    }

    const cards = cardsTitles.map((cardName) => <ItemCard key={cardName} cardName={cardName} handleClickCards={handleClickCards} />);
    

    return (
        <div className={styles.body}>

            {touchCardButton ? 
            <main className={styles.main}>
                {state?.length === 1 ? 
                <div>
                    <p>Карточки закончились. Начать заново ?</p>
                    <button onClick={() => setTouchCardButton(false)}>
                        Назад
                    </button>
                </div> :
                <CardPage
                    randomWord={randomWord}
                    handleClickNextWord={handleClickNextWord}
                    language={language}
                    isTranslation={isTranslation}
                    setIsTranslation={setIsTranslation}
                    state={state}
                    openNewSession={openNewSession}
                    changeLanguage={changeLanguage}
                    setTouchCardButton={setTouchCardButton}
                />}
            </main> :
            <div>
                <button onClick={() => navigate(-1)}>
                    Назад
                </button>
                {cards}
            </div> }
        </div>
    )
}

export default SelectCardPage

