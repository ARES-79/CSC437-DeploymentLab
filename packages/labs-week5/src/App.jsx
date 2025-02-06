import React from 'react';
import Todo from "./components/Todo";
import AddTaskForm from './AddTaskForm';
import './App.css';
import { nanoid } from "nanoid";

function App(props) {
  const INITIAL_TASK_LIST = props.tasks;
  const [taskList, setTaskList] = React.useState(INITIAL_TASK_LIST);

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

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTaskList([...taskList, newTask]);
  }
  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
          <AddTaskForm onNewTask={(taskName) => addTask(taskName)} />

          <section>
              <h1 className="text-xl font-bold">To do</h1>
              <ul role="list">
                {taskListAsTodos}
              </ul>
          </section>
        
      </main> 
  );
}

export default App;