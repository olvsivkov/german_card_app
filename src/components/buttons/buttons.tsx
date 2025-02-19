import { useNavigate } from 'react-router-dom';

import styles from './button.module.css'

function BackButtonNavigate(){
    const navigate = useNavigate();
    return(
        <button
            className={styles.button}
            onClick={() => navigate(-1)}>
            Назад
        </button>
    )
}

export {BackButtonNavigate}