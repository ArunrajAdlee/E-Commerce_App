import React from 'react';
import {
  Card, Accordion, Row, Col, Button,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage, FormikValues,
} from 'formik';
import * as Yup from 'yup';

export type SortTypes = 'NONE' | 'ASC' | 'DESC';

export interface IFilters {
  minPrice: number;
  maxPrice: number;
  sortBy: SortTypes;
}

interface IProps {
    onFilterChanged: (filterObj: IFilters, reset? : boolean) => void;
    onResetFilter: () => void;
}

interface IStates {}

const defaultFilterFormState: IFilters = {
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'NONE',
};

const PriceFilterSchema = Yup.object().shape({
  minPrice: Yup.number()
    .typeError('Please enter number values')
    .required('Minimum price is required')
    .min(0, 'Min value is 0')
    .max(100000, 'Max value is 100,000')
    .test('passwords-match', 'Min Price should be less than Max Price',
      function (value: number) {
        return this.parent.maxPrice >= value;
      }),
  maxPrice: Yup.number()
    .typeError('Please enter number values')
    .required('Maximum price is required')
    .min(0, 'Min value is 0')
    .max(100000, 'Max value is 100,000')
    .test('passwords-match', 'Max Price should be greater than Min Price',
      function (value: number) {
        return this.parent.minPrice <= value;
      }),

});

// Leaving as stateful component for future changes
class Filters extends React.Component<IProps, IStates> {
  public readonly state: Readonly<IStates> = {
  };

  public componentDidUpdate() {
  }

  private handleSubmit = (values: FormikValues, actions: any) => {
    const { onFilterChanged } = this.props;

    const filterdObj: any = {
      minPrice: { display: 'Min Price', value: values.minPrice },
      maxPrice: { display: 'Max Price', value: values.maxPrice },
      sortBy: { display: 'Sort By', value: values.sortBy },
    };

    onFilterChanged(filterdObj);
    actions.setSubmitting(false);
  }

  private handleReset = (resetForm: any) => {
    const { onResetFilter } = this.props;
    resetForm();
    onResetFilter();
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
                    initialValues={defaultFilterFormState}
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
                          <Col xl={5} lg={12} className="p-0">
                            <div className="form-group">
                              <Field
                                type="number"
                                name="minPrice"
                                placeholder="Min"
                                className={`form-control ${
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
                          <Col xl={2} lg={0} className="p">
                            <span>-</span>
                          </Col>
                          <Col xl={5} lg={12} className="p-0">
                            <div className="form-group">
                              <Field
                                name="maxPrice"
                                placeholder="Max"
                                className={`form-control ${
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
                            className="btn-block"
                            variant="dark"
                            onClick={() => this.handleReset(resetForm)}
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
