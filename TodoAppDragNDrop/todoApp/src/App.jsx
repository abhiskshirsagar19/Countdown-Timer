import "./App.css";
import { useState } from "react";
function App() {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.value !== "") {
      //
      if (updateItem) {
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...tasks];
        const filterList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prevTask) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prevTasks) => [...prevTasks, obj]);
      }

      setValue("");
    }
  };
  const handleDrag = (e, task) => {
    //console.log(task);
    setDragTask(task);
  };
  console.log(dragTask);
  // console.log(tasks);

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };
  const handleDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    // console.log("dropping", e.target.getAttribute("data-status"));
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };
  const deleteTask = (item) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id != item.id);
    setTasks(copyTask);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };
  return (
    <>
      <div className="App">
        <h1>Task Manager</h1>
        <input
          type="text"
          onChange={handleInput}
          value={value}
          onKeyDown={handleKeyDown}
        />
        <div className="board">
          <div
            className="todo"
            data-status={TODO}
            onDrop={handleDrop}
            onDragOver={onDragOver}
          >
            <h2 className="todo-col">Todo</h2>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === TODO && (
                    <div
                      className="task-item"
                      key={task.id}
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                    >
                      {task.title}
                      <div className="btns" key={task.id}>
                        <span className="btn" onClick={() => updateTask(task)}>
                          ✏️
                        </span>
                        <span className="btn" onClick={() => deleteTask(task)}>
                          🗑️
                        </span>
                      </div>
                    </div>
                  )
              )}
          </div>

          <div
            className="doing"
            onDrop={handleDrop}
            onDragOver={onDragOver}
            data-status={DOING}
          >
            <h2 className="doing-col">Doing</h2>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === DOING && (
                    <div
                      className="task-item"
                      key={task.id}
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                    >
                      {task.title}
                      <div className="btns" key={task.id}>
                        <span className="btn" onClick={() => updateTask(task)}>
                          ✏️
                        </span>
                        <span className="btn" onClick={() => deleteTask(task)}>
                          🗑️
                        </span>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div
            className="done"
            data-status={DONE}
            onDrop={handleDrop}
            onDragOver={onDragOver}
          >
            <h2 className="done-col">Done</h2>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === DONE && (
                    <div
                      className="task-item"
                      key={task.id}
                      draggable
                      onDrag={(e) => handleDrag(e, task)}
                    >
                      {task.title}
                      <div className="btns" key={task.id}>
                        <span className="btn" onClick={() => updateTask(task)}>
                          ✏️
                        </span>
                        <span className="btn" onClick={() => deleteTask(task)}>
                          🗑️
                        </span>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
