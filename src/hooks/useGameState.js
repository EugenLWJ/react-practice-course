import { useEffect, useState } from "react";
import { utils } from "../utils";

export const useGameState = () => {
    const [ stars, setStars] = useState(utils.random(1,9)); 
    // Avoid using for/while loops
    // use map/filter/reduce instead
    //Whenever identify a data element that is used in a UI and it is going to change value, should make it into a state element
    //Items that share similar DATA or BEHAVIOR, that's a candidate for an item component.
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10)
    //setInterval, setTimeout ==> JS stuff
    useEffect(() => {
        if(secondsLeft > 0 && availableNums.length > 0){
            // eslint-disable-next-line no-unused-vars
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        }
    //   Done rendering
    
      return () => {
        //When it about to unmount the component, clean side effects when no longer needed
        //Component is going to rerender
        // eslint-disable-next-line no-undef
        clearImmediate(timerId);
      }
    }, []);
    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) { // if it doesnt equal to the correct count of stars
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            )
            //redraw stars
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }
    return {stars, availableNums, candidateNums, secondsLeft, setGameState}

}