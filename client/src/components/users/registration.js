import React from 'react';

const List = ({ items, onItemClick }) => (
  <ul>
    {
      items.map((item, i) => 
      <li key={i}>
        <label>Key</label>
          <input className="form-control" value={item.key} name='key' />
        <label>Value</label>
          <input className="form-control" value={item.text } name='text' />
      </li>)
    }
  </ul>
);

export default class Registration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        category: '',
        value: [],
        key: '',
        text: '',        
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: this.state.name,
            category: this.state.category,
            value: this.state.value
        }
        console.log(data)
        fetch("/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data === "success"){
               this.setState({msg: "Thanks for registering"});  
            }
        }).catch(function(err) {
            console.log(err)
        });
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    addItem = () => {
      this.state.value.push({key:this.state.key, text:this.state.text})
      this.setState({ key: '', text: ''});
    }
  
    render() {
      return (
        <div className="form-group">
        <form onSubmit={this.handleSubmit.bind(this)}>        
          <label>
            Name:
            <input
              name="name"
              type="text"
              className="form-control"
              checked={this.state.name}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Category:
            <input
              name="category"
              type="text"
              className="form-control"
              value={this.state.category}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Key:
            <input
              name="key"
              type="text"
              className="form-control"
              value={this.state.key}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Value:
            <input
              name="text"
              type="text"
              className="form-control"
              value={this.state.text}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <div>
            <List items={this.state.value} onItemClick={this.handleItemClick} />
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
        <br />
          <button className="btn btn-primary" onClick={this.addItem}>Add</button>
        </div>
      );
    }
  }