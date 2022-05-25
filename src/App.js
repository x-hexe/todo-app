import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContext from './contexts/TodoContext';
import List from './components/List';
import NewTodo from "./components/NewTodo";
import EditTodo from "./components/EditTodo";

const App = () => {
    const [todo, setTodo] = useState([]);

    const newTodo = (data) => {
        setTodo([...todo, data]);
    };

    const updateTodo = (id, data) => {
        const updateData = todo;
        updateData[ id ] = data;
        setTodo(updateData);
    };

    const deleteTodo = (id) => {
        const updateData = todo;
        updateData.splice(id, 1);
        setTodo(updateData);
    };

    return (
        <TodoContext.Provider value={todo}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<List handleFunction={deleteTodo} />} />
                    <Route path="/new-todo" element={<NewTodo handleFunction={newTodo} />} />
                    <Route path="/edit-todo/:todoId" element={<EditTodo handleFunction={updateTodo} />} />
                </Routes>
            </BrowserRouter>
        </TodoContext.Provider>
    );
};

export default App;