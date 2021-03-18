import './App.css';
import Movies from "../src/Components/Movies";
import logo from "./Assets/logo.png";

function App() {
  return (
    <div className="App">
      <img className="star-wars-logo" src={logo}></img>
      <button className="favorite-pilots">My favorite pilots</button>
      <Movies/>
    </div>
  );
}

export default App;
