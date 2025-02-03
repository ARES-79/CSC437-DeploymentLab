function AddTaskForm() {
    return (
        <div className="mb-4"> {/* Unfortunately comments in JSX have to be done like this */}
              <input class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New task name"/>
              <button class="px-2 py-1 bg-blue-500 text-white font-semibold rounded-md shadow-md 
               hover:bg-blue-600 active:bg-blue-700 ml-2">
                Add task
              </button>
          </div>
    );
}

export default AddTaskForm;