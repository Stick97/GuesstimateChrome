if(!localStorage.trello_token){
    chrome.runtime.sendMessage({GetTrelloToken: true}, function(response){
        if(response !== null && typeof(response) !== 'undefined'){
            localStorage.trello_token = response;
        }
    });
}

if(localStorage.trello_token){
    Trello.authorize({
        name: "Guesstimate for Trello Chrome Extension",
        expiration: "never",
        interactive: false,
        scope: {read: true, write: false},
        success: OnTrelloAuthorized,
        error: function(){
            console.error("Failed to authorize with Trello.")
        }
    });
} else {
    console.error('Failed to get Trello token.');
}

function OnChecklistsLoaded(callback){
    var $checklists = $('.checklist-item');
    if($checklists.length === 0){
        setTimeout(function(){
            OnChecklistsLoaded(callback)
        }, 300)
    } else {
        callback();
    }
}

function OnElementExists(selector, callback){
    var $element = $(selector);
    if($element.length === 0){
        setTimeout(function(){
            OnElementExists(selector, callback)
        }, 100)
    } else {
        callback();
    }
}

function OnTrelloAuthorized(){
    $('.window-wrapper').arrive('.checklist-item', function(){
        var $this = $(this);
        
        $this.find('.checklist-item-details').append('<div class="gues-task-options hide-on-edit">Guesstimate Options</div>');

        $this.find('.checklist-item-details-text').on('click', function(){
            $(this).parent().arrive('.checklist-item .edit-controls', function(){
                $(this).append('<a class="option" href="#">Guesstimate Edit Options</a>')
            });
        });
    });
}