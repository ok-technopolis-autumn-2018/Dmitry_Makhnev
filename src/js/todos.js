import $ from "jquery";

window.autoresize = function(element){
    element.style.height = '36px';
    element.style.height = element.scrollHeight + 'px';
}

window.counter = function (){
    $('.todos-toolbar_unready-counter').text($('.custom-checkbox_target:not(:checked)').length + ' items left');
    checkEmpty();
}

window.checkEmpty = function(){
    if (window.todoList.getItemsCount() == 0){
        $('.todo-board').removeClass('__has-content');
    } else  {
        $('.todo-board').addClass('__has-content');
    }
}

$(document).ready(function(){    
    $('.todos-list_item_text').each(item => autoresize(item));
    
    $('.todo-creator').submit(function(e){
        let inputValue = $('.todo-creator_text-input').val();
        if (inputValue.trim().length > 0){
            window.todoList.addItem(inputValue, false);
            $('.todo-creator_text-input').val('');    
        }
        e.preventDefault();
    });

    $('.todos-toolbar_clear-completed').click(function(){
        window.todoList.clearCompleated();
    });

    $('.completed-btn').click(function(){
        $('.__selected').removeClass('__selected');
        $(this).addClass('__selected');
        $(".custom-checkbox_target").parent().parent().show();
        $(".custom-checkbox_target:not(:checked)").parent().parent().hide();
    });

    $('.active-btn').click(function(){
        $('.__selected').removeClass('__selected');
        $(this).addClass('__selected');
        $(".custom-checkbox_target").parent().parent().show();
        $(".custom-checkbox_target:checked").parent().parent().hide();
    });

    $('.all-btn').click(function(){
        $('.__selected').removeClass('__selected');
        $(this).addClass('__selected');
        $(".custom-checkbox_target").parent().parent().show();
    });

    counter();
});