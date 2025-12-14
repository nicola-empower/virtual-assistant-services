import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2, GripVertical, Loader2, CloudOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

// --- Sortable Item Component ---
function SortableItem({ id, task, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
        >
            <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 font-medium">{task.text}</span>
            </div>
            <button
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on delete click
                onClick={() => onDelete(task.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

// --- Main Component ---
export default function TaskTriage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [activeId, setActiveId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const quadrants = [
        { id: 'do_first', title: 'Do First', subtitle: 'Urgent & Important', color: 'bg-red-50 border-red-200 text-red-800' },
        { id: 'schedule', title: 'Schedule', subtitle: 'Not Urgent, Important', color: 'bg-blue-50 border-blue-200 text-blue-800' },
        { id: 'delegate', title: 'Delegate', subtitle: 'Urgent, Not Important', color: 'bg-amber-50 border-amber-200 text-amber-800' },
        { id: 'delete', title: 'Don\'t Do', subtitle: 'Not Urgent, Not Important', color: 'bg-slate-50 border-slate-200 text-slate-800' }
    ];

    // Fetch Tasks
    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTasks(data || []);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            // Fallback for demo if DB not ready
            setError('Could not sync with database. Changes may not be saved.');
        } finally {
            setLoading(false);
        }
    }

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const tempId = Date.now().toString();
        const taskText = newTask;

        // Optimistic Update
        const optimisticTask = { id: tempId, text: taskText, quadrant: "do_first" };
        setTasks(prev => [...prev, optimisticTask]);
        setNewTask("");

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ text: taskText, quadrant: 'do_first' }])
                .select();

            if (error) throw error;

            // Replace temp ID with real ID
            if (data) {
                setTasks(prev => prev.map(t => t.id === tempId ? data[0] : t));
            }
        } catch (err) {
            console.error('Error adding task:', err);
            setError('Failed to save task.');
            // Revert optimistic
            setTasks(prev => prev.filter(t => t.id !== tempId));
        }
    };

    const deleteTask = async (id) => {
        // Optimistic
        const previousTasks = [...tasks];
        setTasks(tasks.filter(t => t.id !== id));

        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (err) {
            console.error('Error deleting task:', err);
            setTasks(previousTasks);
            setError('Failed to delete task.');
        }
    };

    const findContainer = (id) => {
        if (quadrants.find(q => q.id === id)) return id;
        const task = tasks.find(t => t.id === id);
        return task ? task.quadrant : null;
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        // Move task to the new container's list visually during drag
        setTasks((prev) => {
            const activeItems = prev.filter(t => t.quadrant === activeContainer);
            const overItems = prev.filter(t => t.quadrant === overContainer);

            const activeIndex = activeItems.findIndex(t => t.id === activeId);
            const overIndex = overItems.findIndex(t => t.id === overId);

            let newIndex;
            if (overId in quadrants.map(q => q.id)) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem = over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return prev.map(t => {
                if (t.id === activeId) {
                    return { ...t, quadrant: overContainer };
                }
                return t;
            });
        });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over ? over.id : null);

        if (activeContainer && overContainer && activeContainer !== overContainer) {
            // Optimistic Update (already happened in DragOver mostly, but confirm here)
            setTasks((prev) => {
                return prev.map(t => {
                    if (t.id === active.id) return { ...t, quadrant: overContainer };
                    return t;
                });
            });

            // DB Update
            try {
                const { error } = await supabase
                    .from('tasks')
                    .update({ quadrant: overContainer })
                    .eq('id', active.id);

                if (error) throw error;
            } catch (err) {
                console.error('Error moving task:', err);
                setError('Failed to save move.');
                fetchTasks(); // Revert to server state
            }
        }

        setActiveId(null);
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-teal-600" /></div>;

    return (
        <div className="space-y-8">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <CloudOff className="w-4 h-4" /> {error}
                </div>
            )}

            {/* Input Area */}
            <form onSubmit={addTask} className="flex gap-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What's on your mind? (e.g. Email Client X)"
                    className="flex-1 p-4 border border-slate-200 rounded-xl shadow-sm focus:border-teal-500 outline-none text-lg"
                />
                <button type="submit" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Task
                </button>
            </form>

            {/* The Matrix */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                    {quadrants.map((q) => (
                        <div key={q.id} className={`p-6 rounded-2xl border-2 ${q.color} flex flex-col relative overflow-hidden`}>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold">{q.title}</h3>
                                <p className="text-sm opacity-70">{q.subtitle}</p>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <SortableContext
                                    id={q.id}
                                    items={tasks.filter(t => t.quadrant === q.id).map(t => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-3 min-h-[100px]">
                                        {tasks.filter(t => t.quadrant === q.id).map(task => (
                                            <SortableItem key={task.id} id={task.id} task={task} onDelete={deleteTask} />
                                        ))}
                                        {tasks.filter(t => t.quadrant === q.id).length === 0 && (
                                            <div className="h-full flex items-center justify-center text-sm opacity-40 italic">
                                                Drop tasks here
                                            </div>
                                        )}
                                    </div>
                                </SortableContext>
                            </div>
                        </div>
                    ))}
                </div>

                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <div className="bg-white p-3 rounded-lg shadow-xl border border-teal-500 flex items-center justify-between opacity-90 rotate-3 cursor-grabbing w-[300px]">
                            <div className="flex items-center gap-3">
                                <GripVertical className="w-4 h-4 text-teal-500" />
                                <span className="text-slate-900 font-bold">{tasks.find(t => t.id === activeId)?.text}</span>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
