const ListItem = ({ value, onClick }) => (
  <li onClick={onClick}>{value}</li>
);

const List = ({ items, onItemClick }) => (
  <ul>
    {
      items.map((item, i) => <ListItem key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      fruites: ['Apple', 'Banana', 'Orange']
    };
  }

  onClick = () => {
    const { inputValue, fruites } = this.state;
    if (inputValue) {
      const nextState = [...fruites, inputValue];
      this.setState({ fruites: nextState, inputValue: '' });
    }
  }

  onChange = (e) => this.setState({ inputValue: e.target.value });

  handleItemClick = (e) => {console.log(e.target.innerHTML)}

  render() {
    const { fruites, inputValue } = this.state;
    return (
      <div>
        <input type="text" value={inputValue} onChange={this.onChange} />
        <button onClick={this.onClick}>Add</button>
        <List items={fruites} onItemClick={this.handleItemClick} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));