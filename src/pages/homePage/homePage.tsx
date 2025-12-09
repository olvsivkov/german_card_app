import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header';
import styles from './homePage.module.css'

function HomePage() {

    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <main className={`${styles.main} ${styles.gradient_box}`}>
                <button 
                className={styles.button}
                onClick={() => navigate('cards', { state: { level: 'main' } })}>
                    Карточки
                </button>
                <button 
                    className={styles.button}
                    onClick={() => navigate('cards', { state: { level: 'a2' } })}>
                    Слова и фразы уровень А2
                </button>
            </main>
            <Footer/>
        </>
    )
}   

export default HomePage