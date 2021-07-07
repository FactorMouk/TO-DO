import "./ToDoList.scss";
import emptyListIllust from "./../../assets/imgs/empty-list-illust.png";
import TaskItem from "./../task-item/TaskItem";

function ToDoList() {
  return (
    <div className="ToDoList">
      <p className="title">Nenhuma tarefa criada ainda.</p>
      <img className="empty-list-illust" src={emptyListIllust}></img>
      <p className="sub-title">
        Que tal organizar as ideias criando uma lista agora?
      </p>
      <TaskItem listStatus="empty"></TaskItem>
      <TaskItem taskType="pending"></TaskItem>
    </div>
  );
}

export default ToDoList;
