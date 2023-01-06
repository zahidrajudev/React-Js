import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import EditTodoModal from './EditTodoModal';

function AppContent({ countt, setCountt, filter }) {
    let toDoAllList = JSON.parse(localStorage.getItem('toDoList'));
    const [todoState, setTodoState] = useState([]);
    const [todoFound, setTodoFound] = useState('');

    useEffect(() => {
        if (filter === 'all') {
            setTodoState(toDoAllList);
        }
        if (filter === 'complete') {
            let newtoDoAllList1 = toDoAllList.filter((todos) => todos.status !== 'incomplete');
            setTodoState(newtoDoAllList1);
        }
        if (filter === 'incomplete') {
            let newtoDoAllList2 = toDoAllList.filter((todos) => todos.status !== 'complete');
            setTodoState(newtoDoAllList2);
        }
    }, [countt, filter])

    const handleDelete = (todo) => {
        let newTodoList = toDoAllList.filter((todos) => todos.id !== todo);
        localStorage.setItem('toDoList', JSON.stringify(newTodoList));
        setCountt(countt + 1);
        toast.success("Successfully Task Deleted", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const handleEdit = (todo) => {
        setTodoFound(todo)
        setCountt(countt + 1);
    }

    const handleApprove = (todo) => {
        const newTodoFinal1 = toDoAllList.map((todoo) => {
            if (todoo.id === todo.id && todo.status === 'incomplete') {
                return { ...todoo, status: "complete" };
            }
            if (todoo.id === todo.id && todo.status === 'complete') {
                return { ...todoo, status: "incomplete" };
            }
            return todoo;
        });
        localStorage.setItem('toDoList', JSON.stringify(newTodoFinal1));
        setCountt(countt + 1);
        toast.success("Task Status Updated", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <div className='font-main'>
            {toDoAllList && todoState.map((todo) => (
                <div className={todo.status == 'complete' ? "alert alert-success border-none p-0" : "alert alert-danger border-none p-0"} role="alert" key={todo.id}>
                    <div className="row p-2 align-items-center hvr-curl-top-left">
                        <div className="col-12 col-md-8 text-center text-md-start">
                            <h3>{todo.title}</h3>
                        </div>
                        <div className="col-12 col-md-4 text-center text-md-end fs-3">
                            <i onClick={() => handleApprove(todo)} className={todo.status == 'complete' ? "bi-x-circle-fill  text-danger hvr-bounce-in p-2" : "bi-check-circle-fill text-success hvr-bounce-in p-2"}></i>
                            <i className="bi-pencil-square text-success hvr-bounce-in p-2" onClick={() => handleEdit(todo)} data-bs-toggle="modal" data-bs-target="#editTodoModal"></i>
                            <i className="bi-trash-fill text-danger hvr-bounce-in p-2" onClick={() => handleDelete(todo.id)}></i>
                        </div>
                    </div>
                </div>
            ))}
            <EditTodoModal countt={countt} setCountt={setCountt} todoFound={todoFound} />
        </div>
    )
}

export default AppContent;