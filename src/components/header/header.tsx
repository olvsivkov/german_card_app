import styles from './header.module.css'

import Logo from  '../../assets/logo.svg';

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <img src={Logo} alt="Logo" className={styles.logo} /> 
                <p className={styles.title}>German Cards</p>
            </div>
        </div>
    )
}

export default Header