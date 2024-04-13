import { useState } from "react";
import {Button} from "./components/Button";
import {Display} from "./components/Display"
import { StarMatch } from "./components/StarMatch";

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);
  return (
    <>
      <StarMatch/>
    </>
  );
}

export default App;
