import React from "react";
import { REGISTER_COMPANY } from "config/endpoints.js";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormFeedback
} from "reactstrap";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      from_email: "",
      city: "",
      state: "",
      pincode: "",
      address: "",
      attendance_radius: "",
      longitude: "",
      lattitude: "",
      weekly_off_pattern: "",

      alert: false,
      is_submit: false
    };
  }

  // form validations
  getValidationsErrors() {
    const {
      is_submit,
      name,
      email,
      from_email,
      city,
      state_id,
      pincode,
      address,
      attendance_radius,
      longitude,
      lattitude,
      weekly_off_pattern
    } = this.state;

    const error_name = is_submit && !name ? "This field is required" : null;
    const error_email = is_submit && !email ? "This field is required" : null;
    const error_from_email =
      is_submit && !from_email ? "This field is required" : null;
    const error_city = is_submit && !city ? "This field is required" : null;
    const error_state_id = is_submit && !state_id ? "This field is required" : null;
    const error_pincode =
      is_submit && !pincode ? "This field is required" : null;
    const error_address =
      is_submit && !address ? "This field is required" : null;
    const error_attendance_radius =
      is_submit && !attendance_radius ? "This field is required" : null;
    const error_longitude =
      is_submit && !longitude ? "This field is required" : null;
    const error_lattitude =
      is_submit && !lattitude ? "This field is required" : null;
    const error_weekly_off_pattern =
      is_submit && !weekly_off_pattern ? "This field is required" : null;

    return {
      error_name,
      error_email,
      error_from_email,
      error_city,
      error_state_id,
      error_pincode,
      error_address,
      error_attendance_radius,
      error_longitude,
      error_lattitude,
      error_weekly_off_pattern
    };
  }

  saveCompany() {
    let data = this.state_id;
    console.log(data);
    axios.post(REGISTER_COMPANY, data)
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // handle submit

  handleSubmit = e => {
    e.preventDefault();
    const {
      match: { params }
    } = this.props;
    this.setState({ is_submit: true });
    this.saveCompany();
  };

  render() {
    const {
      name,
      email,
      from_email,
      city,
      state_id,
      pincode,
      address,
      attendance_radius,
      longitude,
      lattitude,
      weekly_off_pattern
    } = this.state;

    const {
      error_name,
      error_email,
      error_city,
      error_state_id,
      error_pincode,
      error_address
    } = this.getValidationsErrors();

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Basic Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            placeholder="Enter Name"
                            type="text"
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                            invalid={error_name ? true : false}
                            value={name}
                            name="name"
                          />
                          <FormFeedback>{error_name}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            placeholder="Enter Email"
                            type="email"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                            invalid={error_email ? true : false}
                            value={email}
                            name="email"
                          />
                          <FormFeedback>{error_email}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>From Email</label>
                          <Input
                            placeholder="Enter From Email"
                            type="email"
                            onChange={e =>
                              this.setState({ from_email: e.target.value })
                            }
                            value={from_email}
                            name="from_email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Enter Address"
                            type="text"
                            onChange={e =>
                              this.setState({ address: e.target.value })
                            }
                            invalid={error_address ? true : false}
                            value={address}
                            name="address"
                          />
                          <FormFeedback>{error_address}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="Enter City"
                            type="text"
                            onChange={e =>
                              this.setState({ city: e.target.value })
                            }
                            invalid={error_city ? true : false}
                            value={city}
                            name="city"
                          />
                          <FormFeedback>{error_city}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>State</label>
                          <Input
                            placeholder="Enter State"
                            type="text"
                            onChange={e =>
                              this.setState({ state_id: e.target.value })
                            }
                            invalid={error_state_id ? true : false}
                            value={state_id}
                            name="state_id"
                          />
                          <FormFeedback>{error_state_id}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Pincode</label>
                          <Input
                            placeholder="Enter Pincode"
                            type="text"
                            onChange={e =>
                              this.setState({ pincode: e.target.value })
                            }
                            invalid={error_pincode ? true : false}
                            value={pincode}
                            name="pincode"
                          />
                          <FormFeedback>{error_pincode}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Weekly Off</label>
                          <Input
                            placeholder="Enter Weekly Off"
                            type="text"
                            onChange={e =>
                              this.setState({
                                weekly_off_pattern: e.target.value
                              })
                            }
                            value={weekly_off_pattern}
                            name="weekly_off_pattern"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Radius</label>
                          <Input
                            placeholder="Enter Radius"
                            type="text"
                            onChange={e =>
                              this.setState({
                                attendance_radius: e.target.value
                              })
                            }
                            value={attendance_radius}
                            name="attendance_radius"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Lattitude</label>
                          <Input
                            placeholder="Enter Lattitude"
                            type="text"
                            onChange={e =>
                              this.setState({ longitude: e.target.value })
                            }
                            value={longitude}
                            name="longitude"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Longitude</label>
                          <Input
                            placeholder="Enter Longitude"
                            type="text"
                            onChange={e =>
                              this.setState({ lattitude: e.target.value })
                            }
                            value={lattitude}
                            name="lattitude"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Add Company
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
