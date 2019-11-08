import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { server, api } from '../../server';

interface Category {
    id: number;
    name: string;
}

interface IStates {
    categories: Category[],
}

interface IProps extends RouteComponentProps<any> {}

class Category extends React.Component<IProps, IStates> {
    public readonly state: Readonly<IStates> = {
      categories: [],
    }

    public async componentDidMount() {
      const result = await server.get(
        api.categories,
      );
      this.setState({ categories: result.data });
    }

    public async handleSelect(eventKey: any) {
      const { history } = this.props;
      const categoryValues = eventKey.split(',');
      const route = `/listings/category/${categoryValues[0]}/${categoryValues[1]}`;
      history.push(route);
    }

    public render() {
      const { categories } = this.state;
      return (
        <DropdownButton id="dropdown-basic-button" title="CATEGORIES" className="nav-link align-self-center p-0" onSelect={(event: any) => this.handleSelect(event)}>
          {categories.map((category) => (<Dropdown.Item key={category.id} eventKey={`${category.id.toString()},${category.name}`}>{category.name.toUpperCase()}</Dropdown.Item>))}
        </DropdownButton>
      );
    }
}

export default withRouter(Category);
