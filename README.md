<!-- thumbnail: https://smileycreations15.com/files/images/jschat.png -->
<!-- version: 2.0.0 -->
<!-- tag: chatbot -->
<!-- excerpt: JSChat is a library to quickly build a chatbot, that can run in a userscript. -->

## What is JSChat?
JSChat is a library to quickly build a chatbot, that can run in a userscript.
## How does it work?
It works by parsing the chat DOM, and calling a handler for each message.
The handler function has 1 argument, `JSChat.ChatMessage`.
## Contents of a ChatMessage object
```none
replyMessageId: A string with the id of the message replied. Blank if the message did not reply to any message. (String)
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
deleted: A boolean indicating if the message is deleted (Boolean)
pending: A boolean indicating if the message is currently not sent to everyone.
```
## FAQ
### Will a message be handled for the second time?
No unless it is edited or deleted.
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
// @require      https://raw.githubusercontent.com/smileycreations15/JSChat/master/index.js
// ==/UserScript==

window.JSChat.run((messageObject) => {
    // handler here
    // messageObject is the `ChatMessage` object for the message that is currently being handled.
})
```
## Functions and object types
The functions can be found in `window.JSChat`.  
Here is how to use the functions.  
### `window.JSChat.run`
Starts a chatbot instance

Arguments:

1. Handler (required)
    A function to handle messages

Return value:  
Number  
A number of the current chatbot instance.  

### `window.JSChat.stop`
Stops a chatbot instance

Arguments:

1. Instance ID
    The instance ID of the chatbot (return value of `window.JSChat.run`)

Return value:  
undefined  
### `window.JSChat.getUserList`
Gets the current list of users in the room

Arguments:

None

Return value:  
An array containing `JSChat.ChatUserInstance` objects
## `window.JSChat.retryMessageSend`
Retry sending all messages if not sent

Arguments:

None

Return value:
undefined
## `window.JSChat.botUsername`
Get the username of the chatbot

Arguments:

None

Return value:
The username of the chatbot ("string")
## `window.JSChat.botUserId`
Get the chat user id of the chatbot

Arguments:

None

Return value:
The chat user id of the chatbot ("string")
## `JSChat.ChatUserInstance`
A user info object.  
This is not located in `window.JSChat`, and is only a name given to this type of objects.  
Object values:

1. username (string)  
    A string containing the display name of the user.
2. activityPercentage (number)    
    A percentage that is set to 99.99 when a user posts a message and decreases over time.  
    This is the brightness percentage of the avatar in chatroom users sidebar.
3. userId (string)    
    A string that contains the chat user id (not main) of the user.

## License
MIT
## Recommendations

1. Don't handle a message if `messageObject.pending` is true  
  A rehandling occurs when `messageObject.pending` switches to false.
2. Do not run 2 instances in parallel on the same tab.  
  This will generate a race condition that makes the fastest one being the only instance to process.
