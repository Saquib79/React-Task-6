// TodoList.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Task from './Task';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'tasks'), where('uid', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        dueDate,
        priority,
        uid: auth.currentUser.uid
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="todo-list">
      <h1>To Do List</h1>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <input type="number" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TodoList;
