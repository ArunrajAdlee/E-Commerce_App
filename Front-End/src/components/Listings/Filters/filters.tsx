import React from 'react';
import axios from 'axios';
import {
  Card, Accordion, Row, Col, Button,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';

type SortTypes = 'NONE' | 'ASC' | 'DESC';

export interface IFilters {
  minPrice: number;
  maxPrice: number;
  sortBy: SortTypes;
}

interface IProps {
    filterChanged: (filterObj: IFilters) => void;
}

interface IStates {}

const emptyFormState = {
  minPrice: 0,
  maxPrice: 3000,
  sortBy: 'NONE',
};

const PriceFilterSchema = Yup.object().shape({
  minPrice: Yup.number()
    .required('Minimum price is required')
    .test('passwords-match', 'Min Price should be less than Max Price',
      function (value: number) {
        return this.parent.maxPrice > value;
      }),
  maxPrice: Yup.number()
    .required('Maximum price is required')
    .test('passwords-match', 'Max Price should be greater than Min Price',
      function (value: number) {
        return this.parent.minPrice < value;
      }),
});

class Filters extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
  };

  public componentDidUpdate() {
  }

  private handleSubmit = (values: FormikValues, actions: any) => {
    const { filterChanged } = this.props;
    const filterdObj: IFilters = {
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
      sortBy: values.sortBy,
    };
    filterChanged(filterdObj);
    actions.setSubmitting(false);
  }

  public render() {
    return (
      <div className="filters mb-5">
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Product Filters
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row className="m-0">
                  <Formik
                    enableReinitialize
                    initialValues={emptyFormState}
                    validationSchema={PriceFilterSchema}
                    onSubmit={(values: FormikValues, actions: any) => {
                      actions.setSubmitting(true);
                      this.handleSubmit(values, actions);
                    }}
                  >
                    {({
                      touched, errors, isSubmitting, resetForm,
                    }) => (
                      <Form>
                        <h5>SORT NAME BY</h5>
                        <Row className="price-filter-body ml-0 mr-0 mt-3">
                          <Col lg={12} className="p-0">
                            <div className="form-group">
                              <Field
                                name="sortBy"
                                component="select"
                                className="form-control"
                              >
                                <option value="NONE">None</option>
                                <option value="ASC">Ascending</option>
                                <option value="DESC">Descending</option>
                              </Field>
                            </div>
                          </Col>
                        </Row>
                        <h5>PRICE</h5>
                        <Row className="price-filter-body ml-0 mr-0 mt-3">
                          <Col md={12} lg={5} className="p-0">
                            <div className="form-group">
                              <Field
                                type="number"
                                name="minPrice"
                                placeholder="Min"
                                className={`form-control styled-input ${
                                  touched.minPrice && errors.minPrice ? 'is-invalid' : ''
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="minPrice"
                                className="invalid-feedback"
                              />
                            </div>
                          </Col>
                          <Col lg={2} md={0} className="p">
                            <span>-</span>
                          </Col>
                          <Col md={12} lg={5} className="p-0">
                            <div className="form-group">
                              <Field
                                name="maxPrice"
                                placeholder="Max"
                                className={`form-control styled-input ${
                                  touched.maxPrice && errors.maxPrice ? 'is-invalid' : ''
                                }`}
                              />
                              <ErrorMessage
                                component="div"
                                name="maxPrice"
                                className="invalid-feedback"
                              />
                            </div>
                          </Col>
                          <Button
                            type="submit"
                            className="btn-block styled-button mt-4"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Applying...' : 'Apply'}
                          </Button>
                          <Button
                            type="submit"
                            className="btn-block"
                            variant="dark"
                            onClick={() => resetForm()}
                          >
                            Reset Filters
                          </Button>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Filters;
