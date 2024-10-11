// Task.js
import React from 'react';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const Task = ({ task }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', task.id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="task">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
