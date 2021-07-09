import React from "react";
import "./TaskItem.scss";
import editBlue from "./../../assets/icons/edit-blue.png";
import deleteBlue from "./../../assets/icons/delete-blue.png";
import "react-alert-confirm/dist/index.css";
import alertConfirm from "react-alert-confirm";

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDescription: this.props.description,
      checked: this.props.checked,
      edited: false,
    };
  }

  static getDerivedStateFromProps(props, currentState) {
    // Updates the current state when props changed
    if (props.updating && !currentState.edited) {
      return {
        tempDescription: props.description,
        checked: props.checked,
      };
    }
    if (
      props.description !== currentState.description &&
      !currentState.edited
    ) {
      return {
        tempDescription: props.description,
      };
    }
    return null;
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
    this.setState({ tempDescription: event.target.value, edited: true });
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
      this.comeBackToOriginal();
    }
  }

  comeBackToOriginal() {
    this.props.changeEditable(false);
    this.setState({ tempDescription: this.props.description, edited: false });
  }

  resetInputText() {
    this.setState({ tempDescription: "" });
    this.inputText.style.height = "22px";
  }

  addTask() {
    this.props.onAdd({ description: this.state.tempDescription.trim() });
    this.resetInputText();
  }

  editTask() {
    this.setState((state) => ({
      tempDescription: state.tempDescription.trim(),
      edited: true,
    }));
    this.props
      .onEdit({ description: this.state.tempDescription.trim() })
      .then(() => {
        this.setState({ edited: false });
      });
    this.props.changeEditable(false);
  }

  deleteTask() {
    alertConfirm({
      title: "Você quer mesmo apagar essa tarefa?",
      content: "Ela irá sumir para sempre.",
      okText: "Sim, quero apagar.",
      cancelText: "Não, mudei de ideia!",
      onOk: () => {
        this.props.onDelete();
      },
    });
  }

  changeStatus(e) {
    this.setState({ checked: e.target.checked });
    setTimeout(() => {
      this.props.onChangeStatus(
        {
          description: this.props.description,
        },
        this.props.taskType === "pending" ? "completed" : "pending"
      );
    }, 200);
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
              name={
                this.props.taskType
                  ? this.props.taskType + this.props.id + "Checkbox"
                  : "addCheckbox"
              }
              disabled={this.props.taskType ? false : true}
              checked={this.state.checked ? this.state.checked : false}
              onChange={(e) => this.changeStatus(e)}
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
                onBlur={() => {
                  if (
                    this.state.tempDescription === "" ||
                    !this.state.tempDescription
                  )
                    this.inputText.style.height = "22px";
                  if (this.props.editing) this.comeBackToOriginal();
                }}
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
            <div className="description">{this.state.tempDescription}</div>
          )}
          {this.props.taskType === "pending" && !this.props.editing && (
            <div className="task-actions">
              <button onClick={() => this.deleteTask()}>
                <img src={deleteBlue}></img>
              </button>
              <button
                onClick={() => {
                  this.setState({ tempDescription: this.props.description });
                  this.props.changeEditable(true);
                }}
              >
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
