import { createFromTemplate } from '../../utils/templatesManager';


export class TodoListComponent {

    constructor(root) {
        this._root = root;
    }

    addTodo(todoText) {
        const newItemHTML = createFromTemplate(
            'todoItemTemplate',
            {
                text: todoText,
            }
        );
        console.log(newItemHTML);

        this._root.appendChild(newItemHTML);
    }


}

