import React from "react";
import "./TasksSet.scss";
import TaskItem from "./../task-item/TaskItem";

class TasksSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingItem: null };
  }

  changeEditable(toEdit, id) {
    this.setState({ editingItem: toEdit ? id : null });
  }

  tasksItems() {
    return this.props.tasks.map((task) => (
      <TaskItem
        key={task.id}
        id={task.id}
        taskType={this.props.setType}
        description={task.description}
        editable={task.id === this.state.editingItem}
        editing={task.id === this.state.editingItem}
        changeEditable={(toEdit) => this.changeEditable(toEdit, task.id)}
      ></TaskItem>
    ));
  }

  render() {
    return (
      <div className="TasksSet">
        {!(
          this.props.setType === "pending" && this.props.tasks.length === 0
        ) && (
          <p>
            {this.props.setType == "pending" ? "Pendente " : "Feito "}
            {this.props.tasks ? `(${this.props.tasks.length})` : "0"}
          </p>
        )}
        {this.tasksItems()}
      </div>
    );
  }
}

export default TasksSet;
