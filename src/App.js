import { useState } from "react";
import {Button} from "./components/Button";
import {Display} from "./components/Display"

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);
  return (
    <div>
      <Button onClickFunction = {incrementCounter} increment={5}/>
      <Button onClickFunction = {incrementCounter} increment={10}/>
      <Button onClickFunction = {incrementCounter} increment={15}/>
      <Button onClickFunction = {incrementCounter} increment={20}/>
      <Display message={counter}/>
    </div>
  );
}

export default App;
