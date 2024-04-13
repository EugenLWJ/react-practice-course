import { useEffect, useState } from "react";
import { utils } from "../utils";
import { PlayNumber } from "./PlayNumber";
import { StarsDisplay } from "./StarsDisplay";
import { PlayAgain } from "./PlayAgain";

export const Game = (props) => {
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
    }, [])
    

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    // const gameIsWon = availableNums.length === 0;
    // const gameIsLost = secondsLeft === 0;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

    // const resetGame = () => {
    //     setStars(utils.random(1,9));
    //     setAvailableNums(utils.range(1,9));
    //     setCandidateNums([]);
    // } // Try unmounting and remounting it instead

    const StarMatch = () => {
        const [gameId, setGameId] = useState(1);
        return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
    } //Unmounting and remount
    
    const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
    };

    const numberStatus = (number) => {
        if(!availableNums.includes(number)) {
            return 'used'
        }
        if(candidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    }
    //Dont call hooks inside loop or conditions
    const onNumberClick = (number, currentStatus) => {
        // currentStatus => newStatus
        if (gameStatus !== 'active' || currentStatus === "used") {
            return; // if the number that got clicked is used, return do nothing
        }
        // else will go to candidateNums
        const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number): candidateNums.filter(cn => cn !== number);

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

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
                    ) : (<StarsDisplay count={stars}/>
                     )}
                    
                </div>
                <div className="right">
                    {utils.range(1,9).map(number => 
                        <PlayNumber 
                        key={number}
                        status={numberStatus(number)}
                        // isUsed= 
                        // isCandidate=
                        onClick={onNumberClick}
                        number={number}/>
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
    
        
    
}
