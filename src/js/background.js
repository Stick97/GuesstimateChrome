var trelloKey = "b0865f126fd5713e04a2771898dd0ce2"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.GetTrelloToken === true && localStorage.trello_token){
        sendResponse(localStorage.trello_token);
    } else {
        sendReponse(null);
    }
})