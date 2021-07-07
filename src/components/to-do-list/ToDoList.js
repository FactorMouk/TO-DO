import "./ToDoList.scss";
import emptyListIllust from "./../../assets/imgs/empty-list-illust.png";
import completedListIllust from "./../../assets/imgs/completed-list-illust.png";
import TasksSet from "./../tasks-set/TasksSet";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

function ToDoList() {
  useFirestoreConnect([
    {
      collection: "tasks",
      where: ["status", "==", 0],
      storeAs: "pendingTasks",
    },
    {
      collection: "tasks",
      where: ["status", "==", 1],
      storeAs: "completedTasks",
    },
  ]);

  const pendingTasks = useSelector(
    (state) => state.firestore.ordered["pendingTasks"]
  );

  const completedTasks = useSelector(
    (state) => state.firestore.ordered["completedTasks"]
  );

  return (
    <div className="ToDoList">
      {(pendingTasks &&
        completedTasks &&
        pendingTasks.length === 0 &&
        completedTasks.length === 0 && (
          <div>
            <p className="title">Nenhuma tarefa criada ainda.</p>
            <img className="empty-list-illust" src={emptyListIllust}></img>
            <p className="sub-title">
              Que tal organizar as ideias criando uma lista agora?
            </p>
          </div>
        )) ||
        (pendingTasks &&
          completedTasks &&
          pendingTasks.length === 0 &&
          completedTasks.length !== 0 && (
            <div>
              <p className="title">Tudo pronto!</p>
              <img
                className="empty-list-illust"
                src={completedListIllust}
              ></img>
              <p className="sub-title">
                Sensação de dever cumprido. Que tal um café agora?
              </p>
            </div>
          ))}
      <TasksSet
        setType="pending"
        tasks={pendingTasks ? pendingTasks : []}
      ></TasksSet>
      <TasksSet
        setType="completed"
        tasks={completedTasks ? completedTasks : []}
      ></TasksSet>
    </div>
  );
}

export default ToDoList;
