import "./ToDoList.scss";
import emptyListIllust from "./../../assets/imgs/empty-list-illust.png";

function ToDoList() {
  return (
    <div className="ToDoList">
      <p className="title">Nenhuma tarefa criada ainda.</p>
      <img className="empty-list-illust" src={emptyListIllust}></img>
    </div>
  );
}

export default ToDoList;
