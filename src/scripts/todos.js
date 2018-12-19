function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
} // Чтобы не было многабукаф

function autoresize(element){
    element.style.height = '36px';
    element.style.height = element.scrollHeight + 'px';
}

function checkboxClick(checkbox){
    var textarea = checkbox.parentNode.parentNode.querySelector('.todos-list_item_text');
    if (checkbox.checked){
        textarea.style.textDecorationColor = '#666';    
    } else {
        textarea.style.textDecorationColor = 'transparent';
    }
    counter();
}

function counter(){
    $('.todos-toolbar_unready-counter').textContent = $$('.custom-checkbox_target:not(:checked)').length + ' items left';
}

document.addEventListener('DOMContentLoaded',function(){
    
    $$('.todos-list_item_text').forEach(item => autoresize(item));
    
    $('.todos-toolbar_clear-completed').addEventListener('click',function(){
        $$('.custom-checkbox_target:checked').forEach(c => c.parentNode.parentNode.remove());
    });
    
    $('.todo-creator').addEventListener('submit', function(e){
        console.log('Тут создавать новый элемент со значением' + $('.todo-creator_text-input').value);
        $('.todo-creator_text-input').value = '';
        e.preventDefault();
    });
    
    counter();
    
});