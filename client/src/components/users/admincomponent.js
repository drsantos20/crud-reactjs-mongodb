import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';


export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            modalIsOpen: false,
            name: '',
            category: '',
            value: [],
            msg: '',
            key: '',
            text: '',
            _id: 0
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
    }

    openModal(member) {
        this.setState({
            modalIsOpen: true,
            name: member.name,
            category: member.category,
            value: member.value,
            _id: member._id
        });
    }

    deleteMember(member){
        var data = {
            _id: member._id
        }
        fetch("/remove", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
               this.setState({msg: "User has been deleted."});  
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    logChange(e) {
        console.log('just test ' + e.target.name)
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        //Edit functionality
        event.preventDefault()
        var data = {
            name: this.state.name,
            category: this.state.category,
            value: this.state.value,
            _id: this.state._id
        }
        fetch("/edit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if (data === "success") {
                this.setState({
                    msg: "User has been edited."
                });
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    componentDidMount() {
        let self = this;
        fetch('/users', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                users: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    handleValuesEdit(index, old, ref, event) {

        if(ref === 'key') {
            var valueToChange = this.state.value.slice();
            valueToChange[index] = {'key': event.target.value, 'text': old};
            this.setState({value: valueToChange});
        } else {
            var valueToChange = this.state.value.slice();
            valueToChange[index] = {'text': event.target.value, 'key': old};
            this.setState({value: valueToChange});
        }

    }

    render() {
        return ( 
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(member =>
                            <tr key={member._id}>
                                <td>{member.name} </td>
                                <td>{member.category}</td>
                                <td><a onClick={() => this.openModal(member)}>Edit</a>|<a onClick={() => this.deleteMember(member)}>Delete</a></td>
                            </tr>
                        )}

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.handleCloseModal.bind(this)}
                            contentLabel="Example Modal" >


                            
                        <form onSubmit={this.handleEdit.bind(this)}>    
                            <label>Name</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='John' name='name'/>
                            <label>Category</label>
                            <input onChange={this.logChange} className="form-control" value={this.state.category} name='category' />
                            

                            {(this.state.value).map((item, i) => (
                                
                                <li key={i}>

                                <label>Key</label>
                                <input onChange={this.handleValuesEdit.bind(this, i, item.text, 'key')} className="form-control" value={item.key } name='key' />
                                <label>Value</label>
                                <input onChange={this.handleValuesEdit.bind(this, i, item.key, 'text')} className="form-control" value={item.text} name='text' />
                                        
                                </li>)
                            )}
                            <div className="submit-section">
                            <input type="submit" className="btn btn-primary" value="Submit" />
                            <button className="btn btn-primary" onClick={this.closeModal}>Close</button>
                            </div>
                        </form>
                        </Modal>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}