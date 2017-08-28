//requires trello-client.js 
var TrelloKey = "b0865f126fd5713e04a2771898dd0ce2",
GetQueryString = function(name){
    name = name.replace(/[\[\]]/g, "\\$&");
    var url = window.location.href,
        regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Trello.setKey(TrelloKey);
if(GetQueryString('token')){
    Trello.authorize({
        name: "Guesstimate for Trello Chrome Extension",
        expiration: "never",
        interactive: false,
        scope: {read: true, write: false},
        success: function(){},
        error: function(){
            console.error("Failed to authorize with Trello.")
        }
    });
}

$('#login').on('click', function(event){
    Trello.authorize({
        name: "Guesstimate for Trello Chrome Extension",
        type: "redirect",
        expiration: "never",
        interactive: true,
        scope: {read: true, write: false},
        success: function(){
            // Can't do nothing, we've left the page
        },
        error: function(){
            console.error("Failed to authorize with Trello.")
        }
    });
});

$('#logout').on('click', function(){
    Trello.deauthorize();
    location.reload();
});

if(!localStorage.trello_token){
    $('#logout').hide();
} else {
    $('#login').hide();
}

