"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Sparkles } from "lucide-react";

const API_URL = "http://localhost:5000/api/todo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      const { data } = await axios.post(API_URL, todoData);
      setTodos([data, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? data : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center px-6 py-20 gap-16">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">Next-Gen Productivity</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Tasks.
          </h1>
          <p className="max-w-md text-zinc-500 text-lg">
            Stay organized and focused with our minimalist todo application.
          </p>
        </header>

        {/* Content */}
        <div className="w-full flex flex-col items-center gap-12">
          <TodoForm onAdd={handleAddTodo} />
          
          {loading ? (
            <div className="flex items-center gap-3 text-zinc-500">
              <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
              <span>Loading your tasks...</span>
            </div>
          ) : (
            <TodoList 
              todos={todos} 
              onToggle={handleToggleTodo} 
              onDelete={handleDeleteTodo} 
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-zinc-700 text-sm font-medium">
          Built with precision and style.
        </footer>
      </main>
    </div>
  );
}
