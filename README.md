<!-- thumbnail:  -->
<!-- version: 2.0.0 -->
<!-- tag: chatbot -->
<!-- excerpt: JSChat is a library to quickly build a chatbot, that can run in a userscript. -->

## What is JSChat?
JSChat is a library to quickly build a chatbot, that can run in a userscript.
## How does it work?
It works by parsing the chat DOM, and calling a handler for each message.
The handler function has 1 argument, `ChatMessage`.
## Contents of a ChatMessage object
```none
node: The message node in the DOM
username: The username of the sender of the message (String)
rawHtml: The raw HTML contents of the message (String)
visibleText: The visible text of the message (no formatting) (String)
userId: The chat user id (not main site user id) of the sender of the message (String)
messageId: The id of the message (String)
send: Send a message to the chatroom (Function) (arguments: messageContents (string containing the contents of the message))
reply: Reply to the message that is currently being handled (Function) (arguments: messageContents (string containing the contents of the message))
deleteMessage: Delete a message from chat (Function) (arguments: messageId (a string that contains the message id of the message to delete))
isModerator: A boolean indicating if the user is a moderator (Boolean)
isRoomOwner: A boolean indicating if the user is a room owner (Boolean)
```
## FAQ
### Will a message be handled for the second time?
No unless it is edited.
## Source Code
Available at index.js
## Setting up

You first need to import the library.  
You can do this by embedding the source code into the script or using a `@require` in userscripts.  
Then you will have access to `window.JSChat` which is the library.  
You need to call `window.JSChat.run` with the argument being a handler function.  
Example userscript:  
```js
// ==UserScript==
// @name         {userscript name here}
// @description  {description here}
// @author       You
// @match        {the url of the chatroom}
// @require      https://raw.githubusercontent.com/smileycreations15/JSChat/master/index.min.js
// ==/UserScript==

window.JSChat.run((messageObject) => {
    // handler here
})
```
