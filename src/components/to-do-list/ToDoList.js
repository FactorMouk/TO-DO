import { useState, useEffect } from "react";
import "./ToDoList.scss";
import firebase from "firebase/app";
import "firebase/auth";
import ReactLoading from "react-loading";
import emptyListIllust from "./../../assets/imgs/empty-list-illust.png";
import completedListIllust from "./../../assets/imgs/completed-list-illust.png";
import loadingListIllust from "./../../assets/imgs/loading-list-illust.png";
import slowNetworkIllust from "./../../assets/imgs/slow-network-illust.png";
import TasksSet from "./../tasks-set/TasksSet";
import TaskItem from "./../task-item/TaskItem";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { onAddTask, onChangeStatusTask } from "../../facades/tasksFacade";

let slowNetworkTimer = 20000;

function ToDoList() {
  const [showSlowNetwork, setShowSlowNetwork] = useState(false);

  useFirestoreConnect([
    {
      collection: "tasks",
    },
  ]);

  useEffect(() => {
    let timer = setTimeout(() => setShowSlowNetwork(true), slowNetworkTimer);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const tasks = useSelector((state) => state.firestore.data["tasks"]);

  let pendingTasks = () =>
    tasks && firebase.auth().currentUser
      ? tasks[firebase.auth().currentUser.uid]
        ? tasks[firebase.auth().currentUser.uid].pending
        : []
      : [];
  let completedTasks = () =>
    tasks && firebase.auth().currentUser
      ? tasks[firebase.auth().currentUser.uid]
        ? tasks[firebase.auth().currentUser.uid].completed
        : []
      : [];

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
    return onChangeStatusTask(
      data,
      newArray,
      from,
      to,
      pendingTasks(),
      completedTasks()
    );
  };

  let onAdd = (data) => {
    let auxArray = JSON.parse(JSON.stringify(pendingTasks()));
    auxArray.push(data);
    onAddTask(auxArray);
  };

  return (
    <div className="ToDoList">
      {(tasks &&
        pendingTasks().length === 0 &&
        completedTasks().length === 0 && (
          <div className="list-header">
            <p className="title">Nenhuma tarefa criada ainda.</p>
            <img
              className="empty-list-illust"
              src={emptyListIllust}
              alt="emptyListIllust"
            ></img>
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
                alt="completedListIllust"
              ></img>
              <p className="sub-title">
                Sensação de dever cumprido. Que tal um café agora?
              </p>
            </div>
          )) ||
        (!tasks && (
          <div className="list-header">
            <p className="title">
              {!showSlowNetwork
                ? "Bem-vindo(a) de volta!"
                : "Está demorando mais do que o normal..."}
            </p>
            <img
              className={
                !showSlowNetwork ? "loading-list-illust" : "slow-network-illust"
              }
              src={!showSlowNetwork ? loadingListIllust : slowNetworkIllust}
              alt={!showSlowNetwork ? "loadingListIllust" : "slowNetworkIllust"}
            ></img>
            <div className="loading-bubbles">
              <ReactLoading
                type={"balls"}
                color={"#191847"}
                height={70}
                width={100}
              />
            </div>
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
      {tasks && (
        <TaskItem
          onAdd={(data) => onAdd(data)}
          editable="true"
          listStatus={listStatus()}
        ></TaskItem>
      )}
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
