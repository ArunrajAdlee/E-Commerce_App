import './App.css';
import React from 'react';
import axios from 'axios';

interface IStates {
  productNames : string[],
}

const BACKEND_URL = 'http://localhost:4000/listings';

class App extends React.Component<{}, IStates> {
  public readonly state: Readonly<IStates> = {
    productNames: [],
  }


  public async componentDidMount() {
    // replace this with api that returns array
    const result = await axios.get(BACKEND_URL);
    const names = result.data.map((product: any) => product.productName);
    if (result) {
      this.setState({ productNames: names });
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
