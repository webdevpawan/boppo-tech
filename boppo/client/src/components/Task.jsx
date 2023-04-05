import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function Task() {
    const [data, setData] = useState({})
    const [status, setStatus] = useState();
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:5000/get-task");
            setData(res.data.task[0])
        }
        getData();
    }, [data]);

    const handleUpdate = async (id) => {
        let status = { status: "progress" }
        const res = await axios.put(`http://localhost:5000/update-task/${id}`, status);
        setStatus(res.data.status)
    }

    return (
        <div className="todo-task">
            <div>
                <h3 className='p-3'>To do</h3>
                <Card style={{ width: '15rem', padding: "20px", margin: "10px" }}>
                    <Card.Title>{data.task}</Card.Title>
                    <p>status: {data.status}</p>
                    <Button variant='primary' onClick={() => { handleUpdate(data._id) }}>Next</Button>
                </Card>
            </div>

        </div>)
}

export default Task
