import React, { useState } from 'react';
import Todo from "./components/Todo";
import AddTaskForm from './AddTaskForm';
import './App.css';
import { nanoid } from "nanoid";
import Modal from './components/Modal';
import { GroceryPanel } from './components/GroceryPanel';

function App(props) {
  const INITIAL_TASK_LIST = props.tasks;
  const [taskList, setTaskList] = React.useState(INITIAL_TASK_LIST);
  const [isOpen, setIsOpen] = useState(false);

  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        console.log({ ...task, completed: !task.completed });
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  function deleteTask(id) {
    console.log('delete:', id);
    const remainingTasks = taskList.filter((task) => id !== task.id);
    setTaskList(remainingTasks);
  }

  const taskListAsTodos = taskList.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  function addTaskAndClose(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTaskList([...taskList, newTask]);
    setIsOpen(false);
  }

  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
          <Modal
           headerLabel="New Task"
           isOpen={isOpen}
           onCloseRequested={() => setIsOpen(false)}>
            <AddTaskForm onNewTask={(taskName) => addTaskAndClose(taskName)} />
          </Modal>

          <button className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-md shadow-md 
              hover:bg-blue-600 active:bg-blue-700 mb-2"
              onClick={() => setIsOpen(true)}>
              New Task
            </button>
          
          <section>
              <h1 className="text-xl font-bold">To do</h1>
              <ul role="list">
                {taskListAsTodos}
              </ul>
          </section>

          <GroceryPanel handleAddItemToList={addTaskAndClose}></GroceryPanel>
        
      </main> 
  );
}

export default App;