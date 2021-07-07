import "./TasksSet.scss";
import TaskItem from "./../task-item/TaskItem";

function TasksSet(props) {
  const tasksItems = props.tasks.map((task) => (
    <TaskItem
      key={task.id}
      taskType={props.setType}
      listStatus="empty"
      description={task.description}
    ></TaskItem>
  ));

  return (
    <div className="TasksSet">
      <p>
        {props.setType == "pending" ? "Pendente" : "Feito"}
        {props.tasks ? `(${props.tasks.length})` : "0"}
      </p>
      {tasksItems}
    </div>
  );
}

export default TasksSet;
