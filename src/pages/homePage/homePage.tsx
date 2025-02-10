import { useNavigate } from 'react-router-dom';

import Footer from '../../components/footer/footer'

function HomePage() {

    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('cards', { replace: false })}>
                Карточки
            </button>
            <Footer/>
        </>
    )
}   

export default HomePage