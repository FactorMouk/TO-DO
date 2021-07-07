import "./TaskItem.scss";
import editBlue from "./../../assets/icons/edit-blue.png";
import deleteBlue from "./../../assets/icons/delete-blue.png";

function TaskItem(props) {
  function autoGrow(event) {
    console.log(event);
    event.target.style.height = "5px";
    event.target.style.height = event.target.scrollHeight + 4 + "px";
  }
  return (
    <div className="TaskItem">
      <div
        className={"task " + (props.taskType ? props.taskType + "-task" : "")}
      >
        <label className="checkbox">
          <input
            type="checkbox"
            disabled={props.taskType ? false : true}
          ></input>
          <span className="label"></span>
        </label>
        <div className="input-text">
          <textarea
            onChange={autoGrow}
            placeholder={
              props.listStatus === "empty"
                ? "Um passo de cada vez"
                : props.listStatus === "pending"
                ? "Cuidado com o Burnout, viu?"
                : props.listStatus === "completed"
                ? "Pera, tem mais uma coisa"
                : ""
            }
          ></textarea>
          <div className="enter-label">Enter ↵</div>
        </div>
        {props.taskType === "pending" && (
          <div className="task-actions">
            <button>
              <img src={deleteBlue}></img>
            </button>
            <button>
              <img src={editBlue}></img>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
