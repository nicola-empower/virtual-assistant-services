import React, { useState } from 'react';
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
import { Plus, Trash2, GripVertical } from 'lucide-react';

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
                <GripVertical className="w-4 h-4 text-slate-300" />
                <span className="text-slate-700 font-medium">{task.text}</span>
            </div>
            <button
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on delete click
                onClick={() => onDelete(task.id)}
                className="text-slate-300 hover:text-red-500 transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

// --- Main Component ---
export default function TaskTriage() {
    const [tasks, setTasks] = useState([
        { id: '1', text: "Client Monthly Report", quadrant: "do_first" },
        { id: '2', text: "Research CRM tools", quadrant: "schedule" },
        { id: '3', text: "Book flights for CEO", quadrant: "delegate" },
        { id: '4', text: "Scroll LinkedIn", quadrant: "delete" },
    ]);
    const [newTask, setNewTask] = useState("");
    const [activeId, setActiveId] = useState(null);

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

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const id = Date.now().toString();
        setTasks([...tasks, { id, text: newTask, quadrant: "do_first" }]);
        setNewTask("");
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
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

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over ? over.id : null);

        if (activeContainer && overContainer && activeContainer !== overContainer) {
            setTasks((prev) => {
                return prev.map(t => {
                    if (t.id === active.id) return { ...t, quadrant: overContainer };
                    return t;
                });
            });
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

    return (
        <div className="space-y-8">
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
