import { useState } from "react";

function AddTaskForm({onNewTask}) {
  const [newTaskName, setNewTaskName] = useState("");
  function handleChange(event) {
    setNewTaskName(event.target.value);
  }
  function handleSubmitNewTask() {
    onNewTask(newTaskName); // onNewTask is from props
    setNewTaskName("");
  }
  return (
      <div className="mb-4"> {/* Unfortunately comments in JSX have to be done like this */}
            <input className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange} placeholder="New task name" value={newTaskName}/>
            <button className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-md shadow-md 
              hover:bg-blue-600 active:bg-blue-700 ml-2"
              onClick={handleSubmitNewTask}>
              Add task
            </button>
        </div>
  );
}

export default AddTaskForm;