import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import UsersList from './UsersList';
import ChangeNameForm from './ChangeNameForm';

import { Col, Panel } from 'react-bootstrap';

import io from 'socket.io-client'
let socket = io(`http://localhost:1337`);


export default class Chatroom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            user: '',
            messages: [],
            text: ''
        }
        this.initialize = this.initialize.bind(this);
        this.messageReceive = this.messageReceive.bind(this);
        this.userJoined = this.userJoined.bind(this);
        this.userLeft = this.userLeft.bind(this);
        this.userChangedName = this.userChangedName.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    componentDidMount() {
        socket.on('init', this.initialize);
        socket.on('newMsg', this.messageReceive)
        socket.on('user:join', this.userJoined);
        socket.on('user:left', this.userLeft);
        socket.on('change:name', this.userChangedName);
    }

    initialize(data) {
        const {users, name} = data;
        this.setState({users, user: name});
    }

     // Push the incoming message into the messages array and refresh the state variables
    messageReceive(message){
        const { messages } = this.state;
        messages.push(message);
        this.setState({ messages });
    }

    userJoined(data) {
        const {users, messages} = this.state;
        const {name} = data;
        users.push(name);
        messages.push({
            user: 'CHATBOT',
            text : name +' joined the room'
        });
        this.setState({users, messages});
    }

    userLeft(data) {
        var {users, messages} = this.state;
        var {name} = data;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            user: 'CHATBOT',
            text : name +' has left the room'
        });
        this.setState({users, messages});
    }

    userChangedName(data) {
        console.log('data', data)
        var {oldName, newName} = data;
        var {users, messages} = this.state;
        var index = users.indexOf(oldName);
        users.splice(index, 1, newName);
        messages.push({
            user: 'CHATBOT',
            text : oldName+' has changed their name to '+ newName
        });
        this.setState({users, messages});
    }

    // Push the message to the server using socket emit
    handleMessageSubmit(message){
        const {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    handleChangeName(newName) {
        const oldName = this.state.user;
        socket.emit('change:name', newName)
        let {users} = this.state;
        const index = users.indexOf(oldName);
        users.splice(index, 1, newName);
        this.setState({users, user: newName});

    }

    render () {
        // const cssPadding = {
        //     padding: 10px
        // }

        return (
            <div className="chatty">
                <Col xs={6} className="test">
                    <Panel header="Messages" bsStyle="primary">
                        <MessageList
                            messages={this.state.messages}
                        />
                    </Panel>
                    <MessageForm
                        submitFunc={this.handleMessageSubmit}
                        user={this.state.user}
                    />
                </Col>
                <Col xs={6}>
                    <Panel header="Users currently online" bsStyle="info">
                        <UsersList
                            users={this.state.users}
                            user={this.state.user}
                        />
                        <ChangeNameForm changeClick={this.handleChangeName} />
                    </Panel>

                </Col>
            </div>
        )
    }
}
