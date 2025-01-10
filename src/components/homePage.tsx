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

    useEffect(
        () => {
            fetchData()  
        }, []
    );

    useEffect(
        ()=> {  // удалить. Функция будет передаваться на кнопку "далее" 
            if(state){
                const word = getRandomWord()
                setRandomWord(word);
            }
        }, [state]
    )

    useEffect(() => { // удалить. Функция будет передаваться на кнопку "далее" 
        if (randomWord) {
            deleteLastRandomWord(randomWord.id);
        }
    }, [randomWord]);

    async function fetchData() {
        const url = 'https://olvsivkov.github.io/german_cards/api/data.json';
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            const data: GermanCard[] = await response.json();
            setState(data)
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    }

    function getRandomWord() {
        const dataArray = state;
        if (!dataArray || dataArray.length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        return dataArray[randomIndex];
    }

    function deleteLastRandomWord(wordID: number) {
        if (state) { 
            const newArray = state.filter(elem => elem.id !== wordID);
            setState(newArray.length > 0 ? newArray : null);
        }
    }

    console.log(state);
    console.log(randomWord);
    console.log(state)

    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <p>HEADER</p>
            </header>
            <main className={styles.main}>
                <CardPage/>
            </main>
            <footer className={styles.footer}>
                <p>FOOTER</p>
            </footer>
        </div>
    )
}

export default HomePage