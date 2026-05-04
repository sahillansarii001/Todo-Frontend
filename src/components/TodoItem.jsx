"use client";

import { CheckCircle, Circle, Trash2 } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="group w-full max-w-2xl flex items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => onToggle(todo._id)}
          className="text-zinc-500 hover:text-blue-500 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500 fill-green-500/10" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div className="flex flex-col">
          <h3 className={`text-lg font-medium transition-all ${todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm ${todo.completed ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
