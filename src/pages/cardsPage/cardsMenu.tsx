import {BackButtonNavigate} from "../../components/buttons/buttons.js";

import { ItemCardProps,  ItemCardsProps} from "../../types/cardsTypes.js";

import styles from "./selectCardPage.module.css"; 

function ItemCard({ cardName, handleClickCards }: ItemCardProps) {
    return( 
        <button className={styles.card_button} onClick={() =>handleClickCards(cardName)}>{cardName}</button>
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