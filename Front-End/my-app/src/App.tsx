import './App.css';
import React from 'react';
import axios from 'axios';

interface IStates {
  productNames : string[],
}

class App extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    productNames: [],
  }

  public async componentDidMount() {
    // replace this with api that returns array
    const result = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(result);
    if (result) {
      this.setState({ productNames: result.data });
    }
  }

  public render() {
    const { productNames } = this.state;

    return (
      productNames.map((name) => (
        <p>{name}</p>
      ))
    );
  }
}

export default App;
