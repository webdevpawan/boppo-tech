import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Task from './Task';


function Home() {
    const [task, setTask] = useState({
        task: '',
        status: ""
    });

    const handleInput = (e) => {
        setTask({ task: e.target.value, status: "todo" })
    }

    const handleTask = async () => {
        await axios.post("http://localhost:5000/add-task", task);
        setTask('');
    }
    return (
        <>
            <div className='d-flex justify-content-center gap-3 p-5 w-100'>
                <input type='text' placeholder="Enter task" onChange={(e) => handleInput(e)} />
                <Button onClick={() => { handleTask() }}>Add</Button>
            </div>
            {/* {
                task.length > 0 ? <Task /> : ''
            } */}

            <Task />
        </>
    )
}

export default Home
