'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TaskFormProps {
  onSubmit: (data: { title: string; description: string; dueDate: string }) => Promise<void>;
  onCancel?: () => void;
  isInline?: boolean;
}

export default function TaskForm({ onSubmit, onCancel, isInline = false }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isInline);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', dueDate: '' });
      if (isInline) setIsExpanded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', dueDate: '' });
    if (isInline) setIsExpanded(false);
    onCancel?.();
  };

  if (isInline && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-navy-300 hover:text-navy-500 transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Add a new task</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-in slide-in-from-top-2 duration-200"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-navy-700 font-medium">
            Task Title <span className="text-red-400">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="What needs to be done?"
            className="border-slate-200 focus:border-navy-500 focus:ring-navy-500"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-navy-700 font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add more details..."
            rows={3}
            className="border-slate-200 focus:border-navy-500 focus:ring-navy-500 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-navy-700 font-medium">
            Due Date
          </Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="border-slate-200 focus:border-navy-500 focus:ring-navy-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          {isInline && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 border-slate-200 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading || !formData.title.trim()}
            className="flex-1 bg-navy-600 hover:bg-navy-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add Task'}
          </Button>
        </div>
      </div>
    </form>
  );
}
