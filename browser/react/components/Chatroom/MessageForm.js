import React from 'react';

// Input form for messages with event handler for change and submit
// Receives submitFunc as a prop from Chatty
export default class MessageForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler(e){
        this.setState({ text : e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        var message = {
            text : this.state.text,
            user: this.props.user
        }
        this.props.submitFunc(message);
        this.setState(
            { text: '' }
        );
    }

    render(){
        return(
          <div className="messageForm">
              <form onSubmit={this.handleSubmit} >
                  <input
                    onChange={this.changeHandler}
                    value={this.state.text}
                    placeholder='Type message here...'
                />
              </form>
          </div>
        )
    }
};
