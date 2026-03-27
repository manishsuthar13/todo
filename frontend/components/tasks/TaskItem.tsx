'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Check, Pencil, Trash2, X, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
}

export default function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(task._id, editData);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(task._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle(task._id);
    } finally {
      setIsLoading(false);
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 animate-in fade-in duration-200">
        <div className="space-y-4">
          <Input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Task title"
            className="border-navy-200 focus:border-navy-500 focus:ring-navy-500"
          />
          <Textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Task description"
            rows={3}
            className="border-navy-200 focus:border-navy-500 focus:ring-navy-500"
          />
          <Input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
            className="border-navy-200 focus:border-navy-500 focus:ring-navy-500"
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              className="border-slate-200 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading || !editData.title.trim()}
              className="bg-navy-600 hover:bg-navy-700 text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-xl p-5 shadow-sm border transition-all duration-300 hover:shadow-md group',
        task.completed ? 'border-mint-200 bg-mint-50/30' : 'border-slate-100',
        isOverdue && 'border-red-200 bg-red-50/30'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            disabled={isLoading}
            className={cn(
              'h-5 w-5 rounded-full border-2 transition-colors',
              task.completed
                ? 'border-mint-500 bg-mint-500 data-[state=checked]:bg-mint-500'
                : 'border-navy-300 hover:border-navy-500'
            )}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-semibold text-navy-800 transition-all',
              task.completed && 'line-through text-slate-400'
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                'mt-1 text-sm text-slate-500 line-clamp-2',
                task.completed && 'line-through text-slate-300'
              )}
            >
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <div
              className={cn(
                'mt-3 flex items-center gap-1.5 text-xs font-medium',
                isOverdue ? 'text-red-500' : task.completed ? 'text-slate-400' : 'text-navy-500'
              )}
            >
              {isOverdue ? (
                <Clock className="w-3.5 h-3.5" />
              ) : (
                <Calendar className="w-3.5 h-3.5" />
              )}
              {isOverdue ? 'Overdue: ' : 'Due: '}
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="h-8 w-8 text-slate-400 hover:text-navy-600 hover:bg-navy-50"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
