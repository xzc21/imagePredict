import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import Signin from './components/Signin/Signin';
import Register from './components/register/register';




const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};



const options={
  fpsLimit: 45,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: true,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "polygon",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}


// const raw = JSON.stringify({
//   "user_app_id": {
//     "user_id": "k8rjrfw1sp98",
//     "app_id": "acf738d864c14553a6220f3b75dfc1d4"
//   },
//   "inputs": [
//     {
//       "data": {
//         "image": {
//           "url": this.state.imageUrl
//         }
//       }
//     }
//   ]
// });

// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Authorization': 'Key 0c07844b1eee407e929f21ec7937f984'
//   },
//   body: raw
// };



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
          
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


    //IDONTKNOW WHAT KIND OF METHODS THIS IS BUT IT WAS ON THE DOCUMENATION BUT IT DIDNT WORK

    // fetch("https://api.clarifai.com/v2/models/4d2e1bf23fde4fd2904a41413244a52b/outputs", requestOptions)
    //  .then(response => response.text())
    // //  .then(result => console.log("hello", JSON.parse(result, null, 2).outputs[0].data));
    // .then(result => console.log(result));
    // // .catch(error => console.log('error', error));
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, route, box, user} = this.state;
    return (
    <div className="App">
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className='particles'
      options = {options} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home'
      ? <><Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl} />
      </> : (
          this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        

      }
    </div>
    );
  }
}


export default App;
