import firebase from "firebase/app";
import { getFirebase } from "react-redux-firebase";
import { arrayPrepend } from "../utils/funcUtils";

export const addTask = (newPendingTasksArray) => {
  return getFirebase().firestore().collection("tasks").doc("list").update({
    pending: newPendingTasksArray,
  });
};

export const editTask = (newPendingTasksArray) => {
  return getFirebase().firestore().collection("tasks").doc("list").update({
    pending: newPendingTasksArray,
  });
};

export const deleteTask = (newPendingTasksArray) => {
  return getFirebase().firestore().collection("tasks").doc("list").update({
    pending: newPendingTasksArray,
  });
};

export const changeStatusTask = (
  data,
  newArray,
  from,
  to,
  currentCompletedTasks
) => {
  return getFirebase()
    .firestore()
    .collection("tasks")
    .doc("list")
    .update({
      [from]: newArray,
      [to]:
        to === "pending"
          ? firebase.firestore.FieldValue.arrayUnion(data)
          : arrayPrepend(
              data,
              JSON.parse(JSON.stringify(currentCompletedTasks))
            ),
    });
};

export const changePositionTask = (setType, newArray) => {
  return getFirebase()
    .firestore()
    .collection("tasks")
    .doc("list")
    .update({
      [setType]: newArray,
    });
};
