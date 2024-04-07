import React = require("react")

const testData = [
  {name: "Wayne", avatar_url: "website", company: "FaceBook"},
  {name: "Wayne", avatar_url: "website", company: "FaceBook"},
  {name: "Wayne", avatar_url: "website", company: "FaceBook"},
]

const CardList = (props) => {
  <div>
  {props.profile.map(profile => <Card key={profile.id} {...profile}/>)}
    {/* <Card name = ""/>  //Above code can be used to sub here
    <Card {...testData}/> */}
  </div>
}

class Form extends React.Component {
  // userNameInput = React.createRef();
  state = {userName: ''}; // make this the value of the input element
  handleSubmit = async (event) => {
    event.preventDefault(); // must add whenever handle with forms to prevent default of refreshing
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''})
    console.log(
      // this.userNameInput.current.value
    )
  }
  render() {
    return ( //Set onChange to have React to reflect the change..
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.userName} onChange={event => this.setState({userName: event.target.value})} placeholder="GitHub username" required/>
        <button>Add Card</button>
      </form>
    )
  }
}


class Card extends React.Component{
  render() {
    // const profile = testData[0];
    const profile = this.props;
    return (
      <div className="github-profile" style={{margin: '1rem'}}>
        <img src={profile.avatar_url}/>
        <div className="info">
          <div className="name">{profile.name}</div>
        </div>
      </div>
    )
  }
}



class App extends React.Component{
  // constructor(props) { //Constructor must be used when u want to access same property to more than 1 sibling
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }
  state = {
    profiles:testData,
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }))
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
      
    )
  }
}


// function App() {
  
//   return (
    
//   );
// }

// export default App;
