import React, { useState, useEffect } from "react"
import { getAllTask } from "../api/task.api";


export function TaskList() {

    const [users,setUsers] = useState([])


    useEffect(() => {
        
        async function loadTask(){
            const res = await getAllTask()
            setUsers(res.data)
        }

        loadTask()

    }, [])


    return <div>
        {users.map(user => (
            <div>
                <h1>{user}</h1>
                <p>{user}</p>
            </div>
        ))}
        </div>

}