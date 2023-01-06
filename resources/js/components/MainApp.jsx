import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import PageTitle from './PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoModal from './TodoModal';

function MainApp() {
    const [countt, setCountt] = useState(0);
    const [filter, setFilter] = useState('all');
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <PageTitle />
                    <div className="card">
                        <div className="card-header">
                            <AppHeader setFilter={setFilter} countt={countt} setCountt={setCountt}></AppHeader>
                        </div>

                        <div className="card-body">
                            <AppContent countt={countt} setCountt={setCountt} filter={filter}></AppContent>
                        </div>
                    </div>
                </div>
            </div>
            <TodoModal countt={countt} setCountt={setCountt} />
            <ToastContainer />
        </div>
    );
}

export default MainApp;

if (document.getElementById('MainApp')) {
    const Index = ReactDOM.createRoot(document.getElementById("MainApp"));

    Index.render(
        <React.StrictMode>
            <MainApp />
        </React.StrictMode>
    )
}
