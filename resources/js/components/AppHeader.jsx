import React from 'react'
import Button, { SelectButton } from './Button';

function AppHeader({ countt, setCountt, setFilter }) {
    return (
        <div className="row font-main">
            <div className="col-6">
                <Button classNames="btn-info fs-5 border-none hvr-curl-bottom-right" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New</Button>
            </div>
            <div className="col-6 text-end">
                <div className='hvr-curl-bottom-right'>
                    <SelectButton onChange={(e) => setFilter(e.target.value)} classNames="form-select shadow-none fs-5" id="status">
                        <option value="all">All List</option>
                        <option value="complete">Complete</option>
                        <option value="incomplete">InComplete</option>
                    </SelectButton>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;