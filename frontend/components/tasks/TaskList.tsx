'use client';

import { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import api from '@/lib/axios';
import TaskItem, { Task } from './TaskItem';
import TaskForm from './TaskForm';
import { Spinner } from '@/components/ui/spinner';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const fetchTasks = async () => {
    try {
      setError(null);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (data: { title: string; description: string; dueDate: string }) => {
    const response = await api.post('/tasks', data);
    setTasks((prev) => [response.data, ...prev]);
  };

  const handleUpdate = async (id: string, data: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, data);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...response.data } : task))
    );
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const handleToggle = async (id: string) => {
    const response = await api.patch(`/tasks/${id}`);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, completed: response.data.completed } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Spinner className="h-8 w-8 text-navy-500" />
        <p className="mt-4 text-slate-500">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Something went wrong</h3>
        <p className="text-slate-500 mb-4">{error}</p>
        <button
          onClick={fetchTasks}
          className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-navy-600" />
          </div>
          <span className="text-slate-600">
            <span className="font-semibold text-navy-800">{tasks.length}</span> Total
          </span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Circle className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-slate-600">
            <span className="font-semibold text-amber-600">{activeCount}</span> Active
          </span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-mint-600" />
          </div>
          <span className="text-slate-600">
            <span className="font-semibold text-mint-600">{completedCount}</span> Done
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-navy-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Task Form */}
      <TaskForm onSubmit={handleCreate} isInline />

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </h3>
            <p className="text-slate-400">
              {filter === 'all'
                ? 'Add your first task to get started!'
                : filter === 'active'
                ? 'All tasks are completed. Great job!'
                : 'Complete some tasks to see them here.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}
