import { utils } from "../utils";
export const StarsDisplay = (props) => {
    <>
        {utils.range(1, props.count).map(starId => (
            <div key={starId} className="star"/>
        ))}
    </>
    // 1) UI logic to describe State : Easier to come up with UI logic first than App Logic 
    // 2) App logic to change state
};