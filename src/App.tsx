import React, { useState } from 'react';
import { Plus, Trash2, Check, X,} from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    
    if (newTodo.trim()) {
      const todo: Todo = {
        id: todos.length + 1,
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };
  

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {activeTodos} active {activeTodos === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-60">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                todo.completed ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3 flex-grow">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded-full ${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {todo.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </button>

                <div className="flex flex-col">
                  <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                  
                </div>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;