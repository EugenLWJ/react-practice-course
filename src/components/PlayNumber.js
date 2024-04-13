

export const PlayNumber = props => {
     const colors = {
            available: 'lightgray',
            used: 'lightgreen',
            wrong: 'lightcoral',
            candidate: 'deepskyblue',
        };
    return (
        <button  className="number" 
        style={{backgroundColor: colors[props.status]}}
        // onClick={() => console.log('Num', props.number)}>
        onClick={() => props.onClick(props.number, props.status)}
        >
            {props.number}
        </button>
    )
    
}