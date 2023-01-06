import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Button, { SelectButton } from './Button';

function EditTodoModal({ countt, setCountt, todoFound }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    //const [count, setCount] = useState(0);
    useEffect(() => {
        setTitle(todoFound.title ? todoFound.title : '');
        setStatus(todoFound.status ? todoFound.status : '');
    }, [countt]);

    const handleSubmit = () => {
        if (title && status) {
            //setCount(count + 1);
            let allTodo = JSON.parse(localStorage.getItem('toDoList'));
            const newTodoFinal = allTodo.map((todo) => {
                if (todo.id === todoFound.id) {
                    return { ...todo, title: title, status: status };
                }
                return todo;
            });
            localStorage.setItem('toDoList', JSON.stringify(newTodoFinal));
            setCountt(countt + 1);
            document.getElementById("modalClose").click();
        } else {
            toast.error("Please fill out all Fields", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div className="modal fade" data-bs-backdrop="static" id="editTodoModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h1 className="modal-title" id="editTodoModal">Update Task </h1>
                        <Button classNames='btn-close' id="modalClose" data-bs-dismiss="modal" aria-label="Close"></Button>
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
                        <Button classNames='btn-secondary border-none hvr-curl-bottom-right fs-3 ' data-bs-dismiss="modal">Cancel</Button>
                        <Button classNames='btn-info border-none hvr-curl-bottom-right fs-3' onClick={handleSubmit}>Update</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodoModal