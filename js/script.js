function hasClass(elem, className) {
    return elem.classList.contains(className); //вернуть его
}

function addClass(elem, className) {
        elem.classList.add(className); //добавить
}

function removeClass(elem, className) {
        elem.classList.remove(className); // удалить
}

document.addEventListener("DOMContentLoaded", function () {
    var state = [ // состояние по дефолту
        {
            text: 'HTML',
            completed: false, // флаг - готов или не готов
        },

        {
            text: 'CSS',
            completed: false,
        },

        {
            text: 'JS',
            completed: false, // автовыведение типа к bool

        },

        {
            text: 'JS Tools',
            completed: false,
        },

    ];

    var filteredId = 'all';

    var filterBtns = [
        {
            name: 'All',
            id: 'all',
        },

        {
            name: 'Active',
            id: 'active',
        },

        {
            name: 'Completed',
            id: 'completed',
        },
    ];


    var listEl = document.getElementById('todo-list');
    var formEl = document.getElementById('todo-add-form');
    var countEl = document.getElementById('todo-count');
    var doneAllEl = document.getElementById('todo-all-done');
    var filterBtnsEl = document.getElementById('filter-btn');

    var clearCompleted = document.getElementById('clear-completed');


    // метод обновляет html у списка
    var renderList = function () { //index для присвоения id
        var htmlList = '';
        var countsItems = 0;
        
        for(var i = 0; i < state.length; i++) {
            var todo = state[i];

            if (filteredId === 'active' && todo.completed) continue;
            if (filteredId === 'completed' && !todo.completed) continue;
            countsItems++;
    htmlList += '<li class="todo_list_item ' + (todo.completed ? 'todo_list_item__completed' : '') + '">' +
                '   <div class="checkbox">' + ' ' +
                '       <input type="checkbox"' + 
                '               id="todo_checkbox_' + i + '"' +
                '               data-todo-index="' + i + '"' +
                '               ' + (todo.completed ? 'checked' : '') + 
                '               class="checkbox_input"' +
                '               aria-label="isReady"/>' +
                '       <label for="todo_checkbox_' + i + '"></label>' +
                '   </div>' +
                '   <input type="text" class="todo_list_item_name" data-todo-index="' + i + '" value="' + todo.text + '" />' +
                '   <div class="todo_list_item_remove" data-todo-index="' + i + '"></div>' +
                '</li>';
        }


        countEl.innerText = countsItems + ' items left'; // меняем счетчик
        listEl.innerHTML = htmlList; 
    };

    var renderBtnList = function () {
        var btnsHtml = '';

        for(var i = 0; i < filterBtns.length; i++) {
            var btn = filterBtns[i];
            btnsHtml += '<div data-filter-id="' + btn.id + '" class="todo_toolbar_buttons_item ' + (btn.id === filteredId ? 'active' : '') + '">' + btn.name + '</div>'
        }

        filterBtnsEl.innerHTML = btnsHtml;
    };

    renderList();
    renderBtnList();


    var getStateItemIndexByElement = function (el) {
        var todoIndex = el.getAttribute('data-todo-index'); // возвращение атрибута
        if (!todoIndex) return null;
        todoIndex = parseInt(todoIndex, 10); //10 - десятичная система
        if (isNaN(todoIndex) || !state[todoIndex]) return null;

        return todoIndex;
    };

    filterBtnsEl.addEventListener('click', function (e) {
        if (hasClass(e.target, 'todo_toolbar_buttons_item')) {
            filteredId = e.target.getAttribute('data-filter-id');
            renderList();
            renderBtnList();
        }
    });

    clearCompleted.addEventListener('click', function (e) {
        state = state.filter(function (el) {
            return !el.completed;
        });

        renderList();
    });

    doneAllEl.addEventListener('click', function (e) {
        state = state.map(function (el) {
            el.completed = true;
            return el;
        });

        renderList();
    });


    listEl.addEventListener('click', function (e) {
        var index;

        // слушаем кнопку "удалить"
        if (e.target.className === 'todo_list_item_remove') { // если я кликнул на элемент в этой области
            index = getStateItemIndexByElement(e.target);

            if (index !== null) {
                state.splice(index, 1);
                renderList();
            }
        }

        if (e.target.className === 'checkbox_input') {
            index = getStateItemIndexByElement(e.target);

            if (index !== null) {
                state[index].completed = !state[index].completed;
                renderList();
            }
        }
    });


    listEl.addEventListener('input', function (e) {
        if (e.target.className === 'todo_list_item_name') {
            var index = getStateItemIndexByElement(e.target);

            if (index !== null) {
                state[index].text = e.target.value;
            }
        }
    });

    // добавление
    formEl.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = e.target.getElementsByClassName('todo_form_input')[0];

        if (input && input.value) {
            state.push({ // добавление элементов
                text: input.value,
                completed: false,
            });

            input.value = '';

            renderList();
        }
    });
});