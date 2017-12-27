var React = require('react');

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []  
    };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users: users }));
  }

  render() {
    return (
        <div className="Users">
          <h1>Users</h1>
          {this.state.users.map(user =>
            <div key={user._id}>{user.name} {user.username} - {user.email}</div>
          )}
        </div>
    );
  }
}



