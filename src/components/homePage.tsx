import { useEffect, useState } from 'react';

import CardPage from "./cartPage";
import styles from "./homePage.module.css"; 

interface GermanCard {
    id: number;
    ger: string;
    rus: string;
}

function HomePage () {
    const [state, setState] = useState<GermanCard[] | null>(null);
    const [randomWord, setRandomWord] = useState<GermanCard | null>(null);
    const [language, setLanguage] = useState<string | null>("ger")
    const [isTranslation, setIsTranslation] = useState(false)
    const [lastWordId, setLastWordId] = useState<number | null>(null); //!!!

    useEffect(
        () => {
            fetchData();
        }, []
    );

    async function fetchData() {
        const url = 'https://olvsivkov.github.io/german_cards/api/data.json';
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            const data: GermanCard[] = await response.json();
            setState(data)
            setRandomWord(getRandomWord(data)); 
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

    function openNewSession(){
        fetchData()
        setLastWordId(null); 
    }

    function changeLanguage(){
        if(language === "ger") setLanguage("rus")
        else setLanguage("ger")
    }

    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <p>HEADER</p>
                <p>{state?.length}</p>
                <button onClick={openNewSession}>Сброс</button>
                <button onClick={changeLanguage}>Менять язык</button>
                <p>язык {language}</p>
            </header>
            <main className={styles.main}>
                {state?.length === 1 ? 
                <div>
                    <p>Карточки закончились. Начать заново ?</p>
                    <button onClick={openNewSession}>Заново</button> 
                </div> :
                <CardPage
                    randomWord={randomWord}
                    handleClickNextWord={handleClickNextWord}
                    language={language}
                    isTranslation={isTranslation}
                    setIsTranslation={setIsTranslation}
                />}
            </main>
            <footer className={styles.footer}>
                <p>FOOTER</p>
            </footer>
        </div>
    )
}

export default HomePage

