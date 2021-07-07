import ToDoList from "./components/to-do-list/ToDoList";
import "./App.scss";
import toDoLogo from "./assets/imgs/to-do-logo.png";
import backIllust1 from "./assets/imgs/background-illust-1.png";
import backIllust2 from "./assets/imgs/background-illust-2.png";

function App() {
  return (
    <div className="ToDoApp">
      <header>
        <img src={toDoLogo}></img>
      </header>
      <div className="main-container">
        <div className="content">
          <ToDoList />
        </div>
        <div className="background">
          <img className="back-illust1" src={backIllust1}></img>
          <img className="back-illust2" src={backIllust2}></img>
        </div>
      </div>
      <footer>
        <p>
          Um teste projetado pela <a href="https://guava.software/">Guava</a>
        </p>
        <p>
          Ilustrações por
          <a href="https://www.opendoodles.com/"> Open Doodles</a> | Inter UI
          Font Family por
          <a href="https://rsms.me/"> Rasmus Andersson</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
