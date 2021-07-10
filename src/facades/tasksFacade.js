import {
  addTask,
  editTask,
  deleteTask,
  changeStatusTask,
  changePositionTask,
} from "./../firestore";

export function onAddTask(newPendingTasksArray) {
  return addTask(newPendingTasksArray);
}

export function onEditTask(newPendingTasksArray) {
  return editTask(newPendingTasksArray);
}

export function onDeleteTask(newPendingTasksArray) {
  return deleteTask(newPendingTasksArray);
}

export function onChangeStatusTask(
  task,
  newArray,
  from,
  to,
  pendingCompletedTasks,
  currentCompletedTasks
) {
  return changeStatusTask(
    task,
    newArray,
    from,
    to,
    pendingCompletedTasks,
    currentCompletedTasks
  );
}

export function onChangePositionTask(setType, newArray) {
  return changePositionTask(setType, newArray);
}
