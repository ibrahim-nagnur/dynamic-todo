import { useState, useEffect } from 'react';
import Section from './components/Section.jsx';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = sessionStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.title) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'Pending',
        timestamp: null,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '' });
    }
  };

  const moveTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.status === 'Pending') task.status = 'In Progress';
        else if (task.status === 'In Progress') {
          task.status = 'Completed';
          task.timestamp = new Date().toLocaleString();
        }
      }
      return task;
    }));
  };

  const getTasksByStatus = (status) => {
    console.log(tasks.filter(task => task.status === status))
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="app">
      <div className="new-task">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button className='addTaskButton' onClick={addTask}>Add Task</button>
      </div>
      <div className="sections">
        <Section title={`TODO ${getTasksByStatus('Pending').length} ISSUE`} tasks={getTasksByStatus('Pending')} onMove={moveTask} />
        <Section title={`IN PROGRESS ${getTasksByStatus('In Progress').length} ISSUE`} tasks={getTasksByStatus('In Progress')} onMove={moveTask} />
        <Section title="DONE" tasks={getTasksByStatus('Completed')} />
      </div>
    </div>
  );
};

export default App;