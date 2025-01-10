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

    function getRandomWord(dataArray: GermanCard[]) { // изменить, чтоб функция выдавала случайный id
        if (!dataArray || dataArray.length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        console.log(randomIndex)
        return dataArray[randomIndex];
    }

    function handleClickNextWord(id: number) {
        if(state){
            deleteLastRandomWord(id);
            const word = getRandomWord(state)
            setRandomWord(word);
            setIsTranslation(false)
            console.log("Click!")
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
                <CardPage
                    randomWord={randomWord}
                    handleClickNextWord={handleClickNextWord}
                    language={language}
                    isTranslation={isTranslation}
                    setIsTranslation={setIsTranslation}
                />
            </main>
            <footer className={styles.footer}>
                <p>FOOTER</p>
            </footer>
        </div>
    )
}

export default HomePage