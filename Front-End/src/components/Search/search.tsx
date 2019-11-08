import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

interface IStates {
  searchText: string,
}

interface IProps extends RouteComponentProps<any> {}

class Search extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleDescription(event: any) {
    this.setState({
      searchText: event.target.value,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const { history } = this.props;
    const { searchText } = this.state;
    const query = searchText.replace(' ', '+');
    const route = `/listings/search/${query}`;
    history.push(route);
  }

  public render() {
    const { searchText } = this.state;
    return (
      <Form className="search-container mr-3" onSubmit={(event: any) => this.handleSubmit(event)}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(event: any) => this.handleDescription(event)}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-warning"><FontAwesomeIcon icon={faSearch} /></Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default withRouter(Search);
