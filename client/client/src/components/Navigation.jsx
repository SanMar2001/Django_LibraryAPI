import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div>
            <Link to="/task">TaskApp</Link>
            <br/>
            <Link to="/task-create">Create task</Link>
        </div>

    )
}