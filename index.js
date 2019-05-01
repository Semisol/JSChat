(function() {
    window.JSChat = {}
    window.JSChat.run = (handler) => {
        if (typeof handler !== "function") throw new TypeError("The handler is not a function.");
        setTimeout(() => {
            var io;
            for (io = 0; io !== document.getElementsByClassName("content").length; io++) {
                var messageData = {}
                if (0 === document.getElementsByClassName("content")[io].parentElement.getElementsByClassName("reply-info").length) {
                    messageData.replyMessageId = ""
                } else {
                    messageData.replyMessageId = document.getElementsByClassName("content")[io].parentElement.getElementsByClassName("reply-info")[0].href.split("#")[1]
                }
                messageData.node = document.getElementsByClassName("content")[io]
                messageData.username = document.getElementsByClassName("content")[io].parentElement.parentElement.parentElement.getElementsByClassName("signature")[0].getElementsByClassName("username")[0].innerHTML;
                messageData.rawHtml = document.getElementsByClassName("content")[io].innerHTML
                messageData.visibleText = document.getElementsByClassName("content")[io].innerText
                messageData.userId = document.getElementsByClassName("content")[io].parentElement.parentElement.parentElement.getElementsByClassName("signature")[0].classList[1].split("-")[1]
                messageData.messageId = document.getElementsByClassName("content")[io].parentElement.id.split("-")[1]
                messageData.send = function(message) {
                    document.getElementById("input").value = message;
                    document.getElementById("sayit-button").click();
                }
                messageData.reply = function(message) {
                    document.getElementById("input").value = ":" + messageData.messageId + " " + message;
                    document.getElementById("sayit-button").click();
                }
                // moderator check
                if (document.getElementsByClassName("content")[io].parentElement.parentElement.parentElement.getElementsByClassName("signature")[0].getElementsByClassName("moderator").length === 0) {
                    messageData.isModerator = false
                } else {
                    messageData.isModerator = true
                }
                if (document.getElementsByClassName("content")[io].parentElement.parentElement.parentElement.getElementsByClassName("signature")[0].getElementsByClassName("owner").length === 0) {
                    messageData.isRoomOwner = false
                } else {
                    messageData.isRoomOwner = true
                }
                messageData.deleteMessage = function(id) {
                    if (document.getElementById("message-" + id).getElementsByClassName("popup")[0].getElementsByClassName("delete")[0] === undefined) {
                        document.getElementById("message-" + id).getElementsByClassName("popup")[0].getElementsByClassName("btn-close")[0].click();
                    } else {
                        document.getElementById("message-" + id).getElementsByClassName("popup")[0].getElementsByClassName("delete")[0].click()
                    }
                }
                if ("<b>(message handled)</b>" === messageData.rawHtml) continue;
                handler(messageData)
                document.getElementsByClassName("content")[io].innerHTML = "<b>(message handled)</b>"

            }
        }, 1000)
    }
})()
