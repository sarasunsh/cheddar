import React from 'react';


export default class UserList extends React.Component {
    render() {
        return (
            <div className='users'>
                <ul>
                    {
                        this.props.users.map((user, i) => {
                            return (
                                <li key={i}>
                                    {user}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
};
