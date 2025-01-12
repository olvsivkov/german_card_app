interface HeaderProps {
    state: number | null; // Предполагаем, что state - это количество оставшихся слов
    openNewSession: () => void; // Функция для сброса
    changeLanguage: () => void; // Функция для смены языка
    language: string | null; // Язык, который используется
}

function Header({ state, openNewSession, changeLanguage, language }: HeaderProps){
    return(
        <>
            <div>
                <p>Осталось слов: {state}</p>
                <button onClick={openNewSession}>Сброс</button>
            </div>
            <div>
                <button onClick={changeLanguage}>Менять язык</button>
                <p>язык {language}</p>
            </div>
        </>
    )
}

export default Header