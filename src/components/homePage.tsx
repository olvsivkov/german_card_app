import { useEffect, useState } from 'react';

import CardPage from "./cartPage";
import Header from './header';
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
            
            const jsonData = await response.json();
            
            // Объединяем все слова из разных разделов в один массив
            const allWords = [];

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
            console.log(allWords)
            // Выбор случайного слова
            setRandomWord(getRandomWord(allWords)); 
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
                <Header
                    state={state?.length ?? 0}
                    language={language}
                    openNewSession={openNewSession}
                    changeLanguage={changeLanguage}
                />
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

