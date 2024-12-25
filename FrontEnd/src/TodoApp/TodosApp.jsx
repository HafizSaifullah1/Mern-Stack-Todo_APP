import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import 'antd'; // Import Ant Design styles

function TodosApp() {
  const [todos, setTodos] = useState([]); // List of todos
  const [task, setTask] = useState(""); // New todo input
  const [editId, setEditId] = useState(null); // ID of todo being edited
  const [editTask, setEditTask] = useState(""); // Edited task input
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  // Fetch Todos on Component Load
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo");
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (task.trim()) {
      try {
        console.log("Task being added:", task);
        const response = await axios.post("http://localhost:5000/todo", {
          task,
          isCompleted: false,
        });
        console.log("API response:", response.data);
        fetchTodos(); // Refresh the todos list after successful addition
        setTask("");  // Clear the input field
      } catch (error) {
        console.error("Error adding todo:", error.response?.data || error.message);
      }
    } else {
      console.error("Task is empty. Cannot add empty todo.");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // Update Todo
  const saveEdit = async () => {
    if (editTask.trim()) {
      try {
        const response = await axios.put(`http://localhost:5000/todo/${editId}`, {
          task: editTask,
        });

        setTodos(
          todos.map((todo) =>
            todo._id === editId ? response.data.updatedTodo : todo
          )
        );
        setEditId(null);
        setEditTask("");
      } catch (error) {
        console.error("Error updating todo:", error.message);
      }
    }
  };

  return (
    <div
      className="bg-cover bg-center text-white min-h-screen flex flex-col items-center justify-start p-6"
      style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/05/18/41/91/360_F_518419158_yXXBww2r5Z3XoutBxRX8KHNZOpPjhC03.jpg')" }}
    >
      <h1 className="text-4xl font-bold mb-8 text-lightPurple text-blue-300">Todo App</h1>

      {/* Input Field to Add New Todo */}
      <div className="mb-6 flex w-full max-w-md space-x-4">
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border-2 border-lightPurple bg-gray-800 text-blue-700 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-lightPurple"
        />
        <button
          onClick={addTodo}
          className="bg-lightPurple hover:bg-blue-900 px-6 py-3 rounded-lg bg-blue-500 focus:outline-none"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="w-full max-w-md space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700"
          >
            {editId === todo._id ? (
              // Edit Mode
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="border-2 border-lightPurple bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-lightPurple"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              // View Mode
              <>
                <span className="text-lg">{todo.task}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditId(todo._id);
                      setEditTask(todo.task);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Ant Design Modal */}
      <Modal
        title="New Task"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        className="bg-gray-800 text-white"
      >
        <p>Enter your task details here...</p>
      </Modal>
    </div>
  );
}

export default TodosApp;
