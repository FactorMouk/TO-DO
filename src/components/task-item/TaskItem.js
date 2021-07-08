import React from "react";
import "./TaskItem.scss";
import editBlue from "./../../assets/icons/edit-blue.png";
import deleteBlue from "./../../assets/icons/delete-blue.png";
import { getFirebase } from "react-redux-firebase";
import "react-alert-confirm/dist/index.css";
import alertConfirm from "react-alert-confirm";

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tempDescription: this.props.description };
  }

  componentDidUpdate() {
    if (this.props.editing) {
      this.inputText.focus();
    }
  }

  autoGrow() {
    this.inputText.style.height = "5px";
    this.inputText.style.height = this.inputText.scrollHeight + 4 + "px";
  }

  updateTempDescription(event) {
    this.setState({ tempDescription: event.target.value });
  }

  changeStatus() {
    getFirebase()
      .firestore()
      .collection("tasks")
      .doc(this.props.id)
      .update({
        status: this.props.taskType === "pending" ? 1 : 0,
        updatedAt: new Date(),
      });
  }

  checkCommand(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (
        this.state.tempDescription &&
        this.state.tempDescription.split(" ").join("") !== ""
      ) {
        if (this.props.editing) {
          this.editTask();
        } else {
          this.addTask();
        }
      }
    }
    if (event.keyCode === 27 && this.props.editing) {
      this.props.changeEditable(false);
      this.setState({ tempDescription: this.props.description });
    }
  }

  resetInputText() {
    this.setState({ tempDescription: "" });
    this.inputText.style.height = "22px";
  }

  addTask() {
    getFirebase().firestore().collection("tasks").add({
      description: this.state.tempDescription.trim(),
      status: 0,
      updatedAt: new Date(),
    });
    this.resetInputText();
  }

  editTask() {
    getFirebase().firestore().collection("tasks").doc(this.props.id).update({
      description: this.state.tempDescription.trim(),
      status: 0,
    });
    this.props.changeEditable(false);
    this.setState((state) => ({
      tempDescription: state.tempDescription.trim(),
    }));
  }

  deleteTask() {
    alertConfirm({
      title: "Você quer mesmo apagar essa tarefa?",
      content: "Ela irá sumir para sempre.",
      okText: "Sim, quero apagar.",
      cancelText: "Não, mudei de ideia!",
      onOk: () => {
        getFirebase()
          .firestore()
          .collection("tasks")
          .doc(this.props.id)
          .delete();
      },
    });
  }

  render() {
    return (
      <div className="TaskItem">
        <div
          className={
            "task " + (this.props.taskType ? this.props.taskType + "-task" : "")
          }
        >
          <label className="checkbox">
            <input
              type="checkbox"
              disabled={this.props.taskType ? false : true}
              defaultChecked={
                this.props.taskType && this.props.taskType === "completed"
                  ? true
                  : false
              }
              onClick={() => this.changeStatus()}
            ></input>
            <span className="label"></span>
          </label>
          {this.props.editable ? (
            <div className="input-text">
              <textarea
                ref={(input) => {
                  this.inputText = input;
                }}
                onChange={(e) => {
                  this.autoGrow();
                  this.updateTempDescription(e);
                }}
                onFocus={(e) => {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                  this.autoGrow();
                }}
                onBlur={() =>
                  this.state.tempDescription === "" ||
                  !this.state.tempDescription
                    ? (this.inputText.style.height = "22px")
                    : null
                }
                onKeyDown={(e) => this.checkCommand(e)}
                placeholder={
                  this.props.listStatus === "empty"
                    ? "Um passo de cada vez"
                    : this.props.listStatus === "pending"
                    ? "Cuidado com o Burnout, viu?"
                    : this.props.listStatus === "completed"
                    ? "Pera, tem mais uma coisa"
                    : ""
                }
                value={this.state.tempDescription}
              ></textarea>
              <div className="enter-label">Enter ↵</div>
            </div>
          ) : (
            <div className="description">{this.props.description}</div>
          )}
          {this.props.taskType === "pending" && !this.props.editing && (
            <div className="task-actions">
              <button onClick={() => this.deleteTask()}>
                <img src={deleteBlue}></img>
              </button>
              <button onClick={() => this.props.changeEditable(true)}>
                <img src={editBlue}></img>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TaskItem;
