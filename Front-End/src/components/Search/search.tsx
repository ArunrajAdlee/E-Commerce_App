import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IStates {
    description: string,
}

class Search extends React.Component<{}, IStates> {
  constructor(props: {}) {
    super(props);

    this.state = {
      description: '',
    };
  }

  handleDescription(event: any) {
    this.setState({
      description: event.target.value,
    });
  }

  handleSubmit(event: any) {
    this.setState({
      description: event.target.value,
    });
  }

  public render() {
    const { description } = this.state;
    return (
      <Form className="w-50 mr-3" onSubmit={(event: any) => this.handleSubmit(event)}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search"
            value={description}
            onChange={(event: any) => this.handleDescription(event)}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default Search;
