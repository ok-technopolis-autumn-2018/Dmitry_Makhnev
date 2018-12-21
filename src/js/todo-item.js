import $ from "jquery";
export default class TodoItem {
    constructor(text, parent,isChecked) {
        this.parent = parent;
        this.isChecked = isChecked;
        this.node = $(`
        <div class="todos-list_item">
            <div class="custom-checkbox todos-list_item_ready-marker">
                <input type="checkbox" class="custom-checkbox_target" aria-label="Mark todo as ready" ${isChecked ? 'checked="checked"' : ''}" />
                <div class="custom-checkbox_visual">
                    <div class="custom-checkbox_visual_icon"></div>
                </div>
            </div>
            <button class="todos-list_item_remove cross-button" aria-label="Delete todo"></button>
            <div class="todos-list_item_text-w">
                <textarea class="todos-list_item_text" onkeyup="autoresize(this)">${text}</textarea>
            </div>
        </div>
        `);
        $(parent.node).append(this.node);
        setTimeout(()=>this.autoresize(this.node.find('.todos-list_item_text')[0]),100); 
        this.node.find('.todos-list_item_remove').click(this.remove.bind(this));
        this.node.find('.custom-checkbox_target').click(this.checkboxClick.bind(this));
    }
    checkboxClick(){
        var textarea = this.node.find('.todos-list_item_text')[0];
        var checkbox = this.node.find('.custom-checkbox_target')[0];
        this.isChecked = checkbox.checked;
        if (checkbox.checked){
            textarea.style.textDecorationColor = '#666';    
        } else {
            textarea.style.textDecorationColor = 'transparent';
        }
        counter();
    }
    remove(){
        this.node.remove();
        this.parent.removeItem(this);
    }
    autoresize(element){
        element.style.height = '36px';
        element.style.height = element.scrollHeight + 'px';
    }
};
