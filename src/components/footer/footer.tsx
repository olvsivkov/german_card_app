import styles from './footer.module.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 

function Footer() {
    return (
        <div className={styles.footer}>
            <p>&copy; {new Date().getFullYear() === 2025 ? '2025' : `2025 - ${new Date().getFullYear()}`}</p>
            <div className={styles.social_links}>
                <a href="https://github.com/olvsivkov" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                </a>
                <a href="https://linkedin.com/in/oleg-sivkov" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                </a>
            </div>
        </div>
    )
}

export default Footer