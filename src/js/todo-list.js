/*
    Простите за jquery :( Не было времени полностью переписывать под модульную и mv* структуру
    Вынужден был так сократить затраты времени, т.к. сейчас завалы на работе (Переделал из старой дз за обеденный перерыв)
    Можно будет потом сделать нормально и показать? Уже вне официального учебного процесса. Просто хочется сделать нормально в итоге, а не так...
*/

import TodoItem from "./todo-item";
import $ from "jquery";

export default class TodoList {
    constructor() {
        this.items = [];
        this.node = $('.todos-list');
    }
    getItemsCount(){
        return this.items.length;
    }
    addItem(text, isChecked){
        var item = new TodoItem(text, this, isChecked);
        this.items.push(item);
        window.counter();
    }
    removeItemByIndex(index){
        this.items[index].remove();
        this.items.splice(index, 1);
        window.counter();
    }
    removeItem(item){
        this.items.splice(this.items.indexOf(item), 1);
        window.counter();
    }
    clearCompleated(){
        let items = this.items.slice();
        for (let item of items){
            if (item.isChecked){
                item.remove();
            }
        }
    }
};
