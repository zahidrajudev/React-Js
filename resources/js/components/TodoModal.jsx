import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Button, { SelectButton } from './Button';
import { v4 as uuid } from 'uuid';

function TodoModal({ countt, setCountt }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (count > 0) {
            //console.warn(count);
            let allTodo = [];
            let previousTodo = JSON.parse(localStorage.getItem('toDoList'));
            if (previousTodo) {
                previousTodo.map((todo) => allTodo.push(todo));
                let newTodo = { id: uuid(), title, status };
                allTodo.push(newTodo);
                localStorage.setItem('toDoList', JSON.stringify(allTodo));
                // console.log(allTodo);
                toast.success("Successfully Task added", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setCountt(countt + 1);
                setTitle('');
            } else {
                localStorage.setItem('toDoList', JSON.stringify([{ id: uuid(), title, status }]));
                toast.success("Successfully added your first Task", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setCountt(countt + 1);
                setTitle('');
            }
        }
    }, [count]);

    const handleSubmit = () => {
        if (title && status) {
            document.getElementById("modalClose1").click();
            setCount(count + 1);
        } else {
            toast.error("Please fill out all Fields", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div className="modal fade" data-bs-backdrop="static" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h1 className="modal-title" id="exampleModalLabel">Add a New Task</h1>
                        <Button classNames='btn-close' id="modalClose1" data-bs-dismiss="modal" aria-label="Close"></Button>
                    </div>
                    <div className="modal-body">
                        <form className='fs-3'>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Task Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <br />
                                <SelectButton classNames="form-select shadow-none" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="incomplete">InComplete</option>
                                    <option value="complete">Complete</option>
                                </SelectButton>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Button classNames='btn-secondary rounded-pill fs-6' data-bs-dismiss="modal">Cancel</Button>
                        <Button classNames='btn-info border-none hvr-curl-bottom-right fs-2' onClick={handleSubmit}>Add</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoModal;