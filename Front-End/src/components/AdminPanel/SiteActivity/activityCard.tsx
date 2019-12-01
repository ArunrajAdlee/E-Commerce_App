import * as React from 'react';
import {
  Card, ListGroup, ListGroupItem, Nav, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IProps {
    title: string,
    importantText: string | number,
    description: string,
    button?: React.Component;
}

const ActivityCard = (props: IProps) => {
  const {
    title, description, importantText, button,
  } = props;
  return (
    <Card className="activity-card">
      <Card.Header><h1 className="important-text">{importantText}</h1></Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {button}
      </Card.Body>
    </Card>
  );
};

export default ActivityCard;
