var GetBoards = function(boards){
    $('#message').text("You're a member of " + boards.length + " Trello boards.");
},
TrelloFailure = function(data){
    $('#error').text(JSON.stringify(data));
}

Trello.setKey("b0865f126fd5713e04a2771898dd0ce2");
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

Trello.get('/members/me/boards', GetBoards, TrelloFailure);