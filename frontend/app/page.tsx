'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

export default function HomePage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && token) {
      router.push('/dashboard');
    }
  }, [token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-mint-50">
        <Spinner className="h-8 w-8 text-navy-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-mint-50">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-600 flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy-800">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-navy-600 hover:text-navy-700 hover:bg-navy-50">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-navy-600 hover:bg-navy-700 text-white shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint-100 text-mint-700 rounded-full text-sm font-medium mb-6 animate-in fade-in duration-500">
            <Zap className="w-4 h-4" />
            Simple. Powerful. Effective.
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-800 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            Manage your tasks
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-600 to-mint-500">
              with clarity
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            Stay organized, focused, and in control. TaskFlow helps you manage your daily tasks
            effortlessly so you can accomplish more with less stress.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-navy-600 hover:bg-navy-700 text-white px-8 h-14 text-lg shadow-lg shadow-navy-600/30 hover:shadow-xl hover:shadow-navy-600/40 transition-all"
              >
                Start for free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-200 hover:bg-slate-50 px-8 h-14 text-lg"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-800">Everything you need</h2>
            <p className="mt-3 text-slate-600">Powerful features to help you stay on top of your tasks</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Easy Task Management</h3>
              <p className="text-slate-500">
                Create, edit, and organize your tasks with a clean, intuitive interface. Mark tasks complete with a single click.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-mint-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Due Date Tracking</h3>
              <p className="text-slate-500">
                Never miss a deadline. Set due dates for your tasks and get visual cues for overdue items.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Secure & Private</h3>
              <p className="text-slate-500">
                Your data is protected with industry-standard security. Access your tasks from anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-navy-800">TaskFlow</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} TaskFlow. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
