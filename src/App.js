import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      await axios.post("/api/tasks", { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>Todo List</h1>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="New task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={addTask}>
              Add Task
            </Button>
          </Form>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title}
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
