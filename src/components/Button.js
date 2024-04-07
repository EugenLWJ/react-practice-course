
export function Button(props) {
    const handleClick = () => props.onClickFunction(props.increment);
    return (
        <button onClick={handleClick}> 
            +{props.increment}
        </button>
    );
}
