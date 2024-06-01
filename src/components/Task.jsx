import React from 'react';

const Task = ({ task, onMove }) => {
  const handleMove = () => {
    onMove(task.id);
  };

  return (
    <div className="task">
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      {task.timestamp && <p className="timeStamp">{task.timestamp}</p>}
      {(task.status === 'Pending' || task.status === 'In Progress') && <button onClick={handleMove}>
        {task.status === 'Pending' ? 'Start' : 'Complete'}
      </button>}
    </div>
  );
};

export default Task;