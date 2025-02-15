import { useEffect, useState } from 'react';

import CardPage from "./cardPage";
import CardsMenu from './cardsMenu.js';

import { GermanCard, CardData } from '../../types/cardsTypes';

import styles from "./selectCardPage.module.css"; 

function SelectCardPage () {

    const [state, setState] = useState<GermanCard[] | null>(null);
    const [jsonData, setJsonData] = useState<CardData | null>(null);
    const [randomWord, setRandomWord] = useState<GermanCard | null>(null);
    const [language, setLanguage] = useState<string | null>("ger")
    const [isTranslation, setIsTranslation] = useState(false)
    const [lastWordId, setLastWordId] = useState<number | null>(null); //!!!
    const [cardsTitles, setCardsTitles] = useState<string[]>([])
    const [touchCardButton, setTouchCardButton] = useState(false)

    // api запрос даных для карточек
    useEffect(
        () => {
            fetchData();
        }, []
    );

    async function fetchData() {
        const url = import.meta.env.VITE_API_CARDS_URL
        console.log(typeof url)

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

    function changeLanguage(){
        if(language === "ger") setLanguage("rus")
        else setLanguage("ger")
    }

    return (
        <div className={styles.body}>
            {touchCardButton ? 
                <CardPage
                    randomWord={randomWord}
                    handleClickNextWord={handleClickNextWord}
                    language={language}
                    isTranslation={isTranslation}
                    setIsTranslation={setIsTranslation}
                    state={state}
                    changeLanguage={changeLanguage}
                    setTouchCardButton={setTouchCardButton}
                />:
                <CardsMenu 
                    handleClickCards={handleClickCards} 
                    cardsTitles={cardsTitles}
                />
            }   
        </div>
    )
}

export default SelectCardPage

