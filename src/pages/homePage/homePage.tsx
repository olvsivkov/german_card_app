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
                <button onClick={() => navigate('cards', { replace: false })}>
                    Карточки
                </button>
            </main>
            <Footer/>
        </>
    )
}   

export default HomePage