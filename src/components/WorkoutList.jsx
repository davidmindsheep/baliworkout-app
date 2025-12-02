import React, { useState } from 'react';
import { workouts } from '../data/workouts';
import { useAuth } from '../contexts/AuthContext';
import VideoPlayer from './VideoPlayer';
import { Play, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkoutList() {
    // Group workouts by category
    const categories = [...new Set(workouts.map(w => w.category))];
    const [expandedCategory, setExpandedCategory] = useState(categories[0]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const { currentUser, logout } = useAuth();
    const firstName = currentUser?.displayName?.split(' ')[0] || 'David';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8 pb-20">
            <header className="text-center py-8 space-y-4 relative">
                <button
                    onClick={handleLogout}
                    className="absolute top-0 right-0 p-2 text-dark-muted hover:text-white transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={24} />
                </button>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Welcome back, Pansy!
                </h1>
                <p className="text-xl text-slate-200">
                    Its about time you hit the gym <span className="text-primary font-bold">{firstName}</span>.
                </p>
                <p className="text-2xl font-black text-white tracking-wider animate-pulse">
                    Lets get those GAINS!!!
                </p>
            </header>

            {categories.map(category => (
                <div key={category} className="card">
                    <button
                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-dark-card hover:bg-slate-800/50 transition-colors"
                    >
                        <h2 className="text-xl font-semibold text-white">{category}</h2>
                        {expandedCategory === category ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-dark-muted" />}
                    </button>

                    <AnimatePresence>
                        {expandedCategory === category && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 space-y-4 bg-slate-900/50">
                                    {workouts.filter(w => w.category === category).map(workout => (
                                        <div key={workout.id} className="bg-dark-bg rounded-lg p-4 border border-slate-800 hover:border-primary/50 transition-all">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-lg text-slate-200">{workout.title}</h3>
                                                    {workout.url ? (
                                                        <button
                                                            onClick={() => setSelectedWorkout(selectedWorkout?.id === workout.id ? null : workout)}
                                                            className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-hover font-medium"
                                                        >
                                                            <Play size={16} />
                                                            {selectedWorkout?.id === workout.id ? 'Hide Video' : 'Watch Video'}
                                                        </button>
                                                    ) : (
                                                        <span className="mt-3 inline-block text-sm text-dark-muted italic">No video available</span>
                                                    )}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {selectedWorkout?.id === workout.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <VideoPlayer url={workout.url} title={workout.title} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
