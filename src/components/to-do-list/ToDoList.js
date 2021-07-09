import "./ToDoList.scss";
import emptyListIllust from "./../../assets/imgs/empty-list-illust.png";
import completedListIllust from "./../../assets/imgs/completed-list-illust.png";
import TasksSet from "./../tasks-set/TasksSet";
import TaskItem from "./../task-item/TaskItem";
import firebase from "firebase/app";
import { getFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

function ToDoList() {
  useFirestoreConnect([
    {
      collection: "tasks",
    },
  ]);

  const tasks = useSelector((state) => state.firestore.data["tasks"]);

  let pendingTasks = () => (tasks ? tasks.list.pending : []);
  let completedTasks = () => (tasks ? tasks.list.completed : []);

  let listStatus = () => {
    if (tasks) {
      if (pendingTasks().length === 0 && completedTasks().length === 0)
        return "empty";
      else if (pendingTasks().length > 0) return "pending";
      else if (pendingTasks().length === 0 && completedTasks().length !== 0)
        return "completed";
    }
  };

  let onChangeStatus = (data, newArray, from, to) => {
    return getFirebase()
      .firestore()
      .collection("tasks")
      .doc("list")
      .update({
        [from]: newArray,
        [to]:
          to === "pending"
            ? firebase.firestore.FieldValue.arrayUnion(data)
            : arrayPrepend(data, JSON.parse(JSON.stringify(completedTasks()))),
      });
  };

  let onAdd = (data) => {
    let auxArray = JSON.parse(JSON.stringify(pendingTasks()));
    auxArray.push(data);
    getFirebase().firestore().collection("tasks").doc("list").update({
      pending: auxArray,
    });
  };

  let arrayPrepend = (value, array) => {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  };

  return (
    <div className="ToDoList">
      {(tasks &&
        pendingTasks().length === 0 &&
        completedTasks().length === 0 && (
          <div className="list-header">
            <p className="title">Nenhuma tarefa criada ainda.</p>
            <img className="empty-list-illust" src={emptyListIllust}></img>
            <p className="sub-title">
              Que tal organizar as ideias criando uma lista agora?
            </p>
          </div>
        )) ||
        (tasks &&
          pendingTasks().length === 0 &&
          completedTasks().length !== 0 && (
            <div className="list-header">
              <p className="title">Tudo pronto!</p>
              <img
                className="completed-list-illust"
                src={completedListIllust}
              ></img>
              <p className="sub-title">
                Sensação de dever cumprido. Que tal um café agora?
              </p>
            </div>
          ))}
      {tasks && pendingTasks().length > 0 && (
        <TasksSet
          setType="pending"
          tasks={pendingTasks()}
          onChangeStatus={(data, newArray, to) =>
            onChangeStatus(data, newArray, "pending", to)
          }
        ></TasksSet>
      )}
      <TaskItem
        onAdd={(data) => onAdd(data)}
        editable="true"
        listStatus={listStatus()}
      ></TaskItem>
      {tasks && completedTasks().length > 0 && (
        <TasksSet
          setType="completed"
          tasks={completedTasks()}
          onChangeStatus={(data, newArray, to) =>
            onChangeStatus(data, newArray, "completed", to)
          }
        ></TasksSet>
      )}
    </div>
  );
}

export default ToDoList;
