import { useNavigate } from 'react-router-dom';

function BackButtonNavigate(){
    const navigate = useNavigate();
    return(
        <button onClick={() => navigate(-1)}>
            Назад
        </button>
    )
}

export {BackButtonNavigate}