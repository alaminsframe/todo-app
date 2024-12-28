import React, { useState } from 'react';
import { Plus, Trash2, Check, X, Calendar, AlertCircle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

type PriorityColor = {
  [key in Todo['priority']]: string;
};

const priorityColors: PriorityColor = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [dueDate, setDueDate] = useState<string>('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
        priority,
        ...(dueDate && { dueDate: new Date(dueDate) })
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      setDueDate('');
      setPriority('medium');
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

  const isOverdue = (todo: Todo): boolean => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date() > new Date(todo.dueDate);
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

        <form onSubmit={addTodo} className="space-y-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo['priority'])}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                todo.completed ? 'bg-gray-50' : 'bg-white'
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
                  
                  <div className="flex gap-2 items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
                      {todo.priority}
                    </span>
                    
                    {todo.dueDate && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(todo.dueDate).toLocaleDateString()}
                        {isOverdue(todo) && (
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
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