import React from 'react';


class Message extends React.Component{
    render(){
        return(
            <div className="message">
                <strong>{this.props.user} : </strong>
                <span>{this.props.msg}</span>
            </div>
        )
    }
};

// Input form for messages with event handler for change and submit
// Receives submitFunc as a prop from Chatty
export default class MessageList extends React.Component {
    render(){
        console.log(this.props)
        const renderMessage = function(message, idx){
            return <Message
                key={idx}
                msg={message.text}
                user={message.user}
            />
        }

        return(
          <div className="messageList">
            <ul>
                {this.props.messages.map(renderMessage)}
            </ul>
          </div>
        )
    }
};


