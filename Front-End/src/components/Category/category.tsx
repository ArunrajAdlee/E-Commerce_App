import React from 'react';
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
const BACKEND_URL = 'http://localhost:4000';

interface Category {
    id: number;
    name: string;
}

interface IStates {
    categories: Category[],
    selectedCategory: number,
    selectedCategoryName: string;
}

class Category extends React.Component<{}, IStates> {
    public readonly state: Readonly<IStates> = {
        categories: [],
        selectedCategory: -1,
        selectedCategoryName: ''
      }
    

  public async componentDidMount() {
    const result = await axios.get(
        BACKEND_URL + '/categories'
    );
    this.setState({categories: result.data});
  }

  public async handleSelect(eventKey: any) {
      const categoryValues = eventKey.split(',');
      this.setState({selectedCategory: parseInt(categoryValues[0]), selectedCategoryName: categoryValues[1]});
  }

  public render() {
    const { categories, selectedCategory, selectedCategoryName } = this.state;

    //If there is a selection made, reroute
    if (selectedCategory >= 0) {
        const route = `/listings/category/${selectedCategory}/${selectedCategoryName}`;
        this.setState({selectedCategory: -1}); //reset selection
      return <Redirect to={route} />;
    }
    return (
    <DropdownButton id="dropdown-basic-button" title="CATEGORIES" className="nav-link align-self-center" onSelect={(event: any) => this.handleSelect(event)}>
        {categories.map((category) => (<Dropdown.Item eventKey={category.id.toString() + ',' + category.name}>{category.name}</Dropdown.Item>))}
    </DropdownButton>
    );
  }
}

export default Category;
