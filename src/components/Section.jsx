import React from 'react';
import Task from './Task';

const Section = ({ title, tasks, onMove }) => {
  return (
    <div className="section">
      <h3>{title}</h3>
      {tasks.map(task => (
        <Task key={task.id} task={task} onMove={onMove} />
      ))}
    </div>
  );
};

export default Section;