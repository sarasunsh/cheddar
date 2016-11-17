import React from 'react';


// Input form for name changes with event handler for change and submit
// Receives changeClick as a prop from Chatty
export default class ChangeName extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            newName: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(evt){
        this.setState({newName: evt.target.value})
    }

    onSubmit(evt){
        evt.preventDefault();
        const newName = this.state.newName;
        this.props.changeClick(newName);
        this.setState(
            { newName: '' }
        );
    }

    render(){
        return(
            <div className='change_name_form'>
                <span>
                    <h5> Change your username </h5>
                    <form onSubmit={this.onSubmit}>
                        <input
                            onChange={this.onChange}
                            value={this.state.newName}
                            placeholder='What should we call you?'
                        />
                    </form>
                </span>
            </div>
        )
    }
};
