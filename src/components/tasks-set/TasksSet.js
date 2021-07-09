import React from "react";
import "./TasksSet.scss";
import TaskItem from "./../task-item/TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getFirebase } from "react-redux-firebase";
class TasksSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingItem: null,
      currentTasks: this.props.tasks,
      updating: false,
      changing: false,
      dragging: false,
    };
  }

  static getDerivedStateFromProps(props, currentState) {
    if (currentState.currentTasks !== props.tasks && !currentState.dragging) {
      return {
        currentTasks: props.tasks,
      };
    }
    return null;
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {
      return;
    };
  }

  changeEditable(toEdit, index) {
    this.setState({ editingItem: toEdit ? index : null });
  }

  onDragStart() {
    this.setState({ dragging: true });
  }

  onDragEnd(result) {
    if (result.source && result.destination) {
      let newArray = this.arrayMove(
        this.state.currentTasks,
        result.source.index,
        result.destination.index
      );
      this.setState({ currentTasks: newArray });
      getFirebase()
        .firestore()
        .collection("tasks")
        .doc("list")
        .update({
          [this.props.setType]: newArray,
        })
        .then(() => setTimeout(this.setState({ dragging: false }), 1000));
    }
  }

  onChangeStatus(data, index, to) {
    let auxArray = JSON.parse(JSON.stringify(this.state.currentTasks));
    auxArray.splice(index, 1);
    this.setState({
      currentTasks: auxArray,
      changing: true,
    });
    this.props
      .onChangeStatus(data, auxArray, to)
      .then(() => this.setState({ changing: false }));
  }

  onEdit(data, index) {
    let auxArray = JSON.parse(JSON.stringify(this.state.currentTasks));
    auxArray[index] = data;
    this.setState({ currentTasks: auxArray, updating: true });
    return getFirebase()
      .firestore()
      .collection("tasks")
      .doc("list")
      .update({
        pending: auxArray,
      })
      .then(() => this.setState({ updating: false }));
  }

  onDelete(index) {
    let auxArray = JSON.parse(JSON.stringify(this.state.currentTasks));
    auxArray.splice(index, 1);
    this.setState({ currentTasks: auxArray, changing: true });
    getFirebase()
      .firestore()
      .collection("tasks")
      .doc("list")
      .update({
        pending: auxArray,
      })
      .then(() => this.setState({ changing: false }));
  }

  arrayMove(arr, startIndex, endIndex) {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  tasksItems() {
    return this.state.currentTasks.map((task, index) => (
      <Draggable
        key={index}
        draggableId={this.props.setType + index}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskItem
              id={index}
              taskType={this.props.setType}
              description={task.description}
              editable={index === this.state.editingItem}
              editing={index === this.state.editingItem}
              updating={this.state.updating}
              changing={this.state.changing}
              dragging={this.state.dragging}
              checked={this.props.setType === "pending" ? false : true}
              changeEditable={(toEdit) => this.changeEditable(toEdit, index)}
              onChangeStatus={(data, to) =>
                this.onChangeStatus(data, index, to)
              }
              onAdd={(data) => this.onAdd(data)}
              onEdit={(data) => this.onEdit(data, index)}
              onDelete={() => this.onDelete(index)}
            ></TaskItem>
          </div>
        )}
      </Draggable>
    ));
  }

  render() {
    return (
      <div className="TasksSet">
        {!(
          this.props.setType === "pending" && this.props.tasks.length === 0
        ) && (
          <p
            className={
              this.props.setType === "completed" ? "completed-title" : ""
            }
          >
            {this.props.setType === "pending" ? "Pendente " : "Feito "}
            {this.props.tasks ? `(${this.state.currentTasks.length})` : "0"}
          </p>
        )}
        <DragDropContext
          onDragStart={() => this.onDragStart()}
          onDragEnd={(e) => this.onDragEnd(e)}
        >
          <Droppable droppableId={this.props.setType + "-droppable"}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {this.tasksItems()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default TasksSet;
