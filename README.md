## What is JSChat?
JSChat is a library to quickly build a chatbot, that can run in a userscript.
## How does it work?
It works by parsing the chat DOM, and calling a handler for each message.
The handler function has 1 argument, ChatMessage.
## Contents of a ChatMessage object
```
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
Avaiable at index.js
## Setting up

Replace the comment `// insert handler here` with your message handler JavaScript code.
