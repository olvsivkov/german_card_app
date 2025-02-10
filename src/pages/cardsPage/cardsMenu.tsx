/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-expect-error
import {BackButtonNavigate} from "../../components/buttons/buttons.jsx";

import styles from "./selectCardPage.module.css"; 

interface ItemCardProps {
    cardName: string;
    handleClickCards: (cardName: string) => void;
}

interface ItemCardsProps {
    cardsTitles: string[];
    handleClickCards: (cardName: string) => void;
}

function ItemCard({ cardName, handleClickCards }: ItemCardProps) {
    return( 
        <div>
            <button className={styles.card_button} onClick={() =>handleClickCards(cardName)}>{cardName}</button>
        </div>
    )
}

function CardsMenu({cardsTitles, handleClickCards}: ItemCardsProps){

    const cards = cardsTitles.map((cardName) => <ItemCard key={cardName} cardName={cardName} handleClickCards={handleClickCards} />);

    return (
        <div>
            <div>
                <BackButtonNavigate/>
            </div>
            <div className={styles.cards_menu}>
                {cards}
            </div>
        </div>
    )
}

export default CardsMenu