import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Input, Button, List, message,Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';


const API_BASE_URL = 'http://localhost:3000/tasks';
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(API_BASE_URL, {
        title,
        description,
        completed: false, // Set completed to false initially
      });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompletion = async (taskId, completed) => {
    try {
      await axios.put(`${API_BASE_URL}/${taskId}`, {
        completed: !completed, // Toggle the completed status
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Typography.Title level={2}>Task Manager</Typography.Title>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{ marginBottom: '10px' }}
      />
      <Button
        type="primary"
        onClick={createTask}
        disabled={!title.trim()}
        style={{ marginBottom: '20px' }}
      >
        Create Task
      </Button>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            actions={[
              <Checkbox
                checked={task.completed}
                onChange={() => toggleCompletion(task.id, task.completed)}
              >
                Completed
              </Checkbox>,
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteTask(task.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={task.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;