import { useState, useEffect } from 'react';
import {ProgressBarProps} from '../../types/cardsTypes'

const ProgressBar = ({remainingWords, state, words}: ProgressBarProps) => {
  const [progress, setProgress] = useState(1);
  const [allWords] = useState(typeof state === 'number' ? state-1 : 0);
  
  useEffect(() => {
    if (allWords > 0) {
        const newProgress = 100 - ((remainingWords / allWords) * 100);
        setProgress(newProgress);
    }
    if(remainingWords === 1) {
        setProgress(100)
    }
  }, [remainingWords, allWords]);

  return (
    <div>
        <p>осталось {remainingWords} из {allWords} {words}</p>
        <progress value={progress} max="100"></progress>
    </div>
  );
};

export default ProgressBar;