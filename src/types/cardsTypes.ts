export interface HeaderProps {
    state: number | null | undefined;
    changeLanguage: (string: string) => void;
    setTouchCardButton: (boolean: boolean) => void
}

export interface GermanCard {
    ger: string;
    id: number;
    rus: string;
}

export interface CardPageProps {
    randomWord: GermanCard | null;
    handleClickNextWord: (id: number) => void;
    language: string | null;
    isTranslation: boolean;
    setIsTranslation: (boolean: boolean) => void;
    state: GermanCard[] | null | undefined;
    changeLanguage: (string: string) => void;
    setTouchCardButton: (boolean: boolean) => void
}

export interface CardData {
    [key: string]: GermanCard[];
}

export  interface ItemCardProps {
    cardName: string;
    handleClickCards: (cardName: string) => void;
}

export interface ItemCardsProps {
    cardsTitles: string[];
    handleClickCards: (cardName: string) => void;
    state: GermanCard[] | null | undefined;
}

export interface ProgressBarProps  {
    state: number | null | undefined;
    remainingWords: number;
    words: string;
}