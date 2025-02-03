import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Todo(props) {
    return(
        <li>
            <label className='mr-6' htmlFor={props.id}>
                <input id={props.id} type="checkbox" defaultChecked={props.completed}/> {props.name}
            </label>
            <button><FontAwesomeIcon icon={faTrashCan} title="Delete" style={{color: "#808080",}} /></button>
        </li>
    );
}

export default Todo;