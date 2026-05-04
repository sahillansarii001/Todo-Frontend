"use client";

import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800 rounded-3xl w-full max-w-2xl">
        <p className="text-zinc-500 text-lg">No tasks yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider">Your Tasks</h2>
        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-500/20">
          {todos.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem 
            key={todo._id} 
            todo={todo} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
}
