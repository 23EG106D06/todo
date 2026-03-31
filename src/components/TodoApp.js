import React, { useEffect, useState } from "react";
const API = "http://localhost:8081/api/todos";
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = () => {
        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: text })
        })
            .then(res => res.json())
            .then(newTodo => {
                setTodos([...todos, newTodo]);
                setText("");
            });
    };

    const deleteTodo = (id) => {
        fetch(`${API}/${id}`, { method: "DELETE" })
            .then(() => setTodos(todos.filter(t => t.id !== id)));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Todo App ✅</h1>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                        {t.title}
                        <button onClick={() => deleteTodo(t.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;