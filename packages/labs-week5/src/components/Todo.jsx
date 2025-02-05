import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Todo(props) {
    return(
        <li>
            <label className='mr-6' htmlFor={props.id}>
                <input id={props.id} 
                    type="checkbox" 
                    className='mr-2'
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}/> 
                    {props.name}
            </label>
            <button onClick={() => props.deleteTask(props.id)}>
                <FontAwesomeIcon icon={faTrashCan} 
                title="Delete" 
                style={{color: "#808080"}}/>
            </button>
        </li>
    );
}

export default Todo;