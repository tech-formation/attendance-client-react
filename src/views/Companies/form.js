import React from "react";
import { REGISTER_COMPANY, EDIT_COMPANY } from "config/endpoints.js";
import states from "config/constants/states";
import { saveCompany  , getCompany , updateCompany} from "models/company";
import { validations } from "config/validation";

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
  Col
} from "reactstrap";

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    email: "",
    from_email: "",
    city: "",
    state_id: "",
    pincode: "",
    address: "",
    attendace_radius: "",
    longitude: "",
    lattitude: "",
    weekly_off_pattern: "",
    firstname: "",
    lastname: "",
    password: "",
    gender: "",
    response: "",

    alert: false,
    is_submit: false
  };

  /**
   * before rendering the component
   */
  componentWillMount() {
    const { match } = this.props;
    const id = match.params.id;
    getCompany(this, id, EDIT_COMPANY);
    this.checkCompanyId();
  }

  // handle submit
  handleSubmit = e => {
    e.preventDefault();
    let formFields = e.target.elements;
    const {
      match: { params }
    } = this.props;
    this.setState({ is_submit: true });
    if (validations(e) === true) {
      if (typeof this.props.match.params.id == "undefined") {
        saveCompany(this, this.state, REGISTER_COMPANY, formFields);
      } else {
        updateCompany(this, EDIT_COMPANY, this.props, this.state, formFields);
      }
    }
  };

  checkCompanyId = () => {
    let id;
    typeof this.props.match.params.id == "undefined"
      ? (id = " ")
      : (id = this.props.match.params.id);
    return id;
  };
  checkCompanyId;

  render() {
    const {
      name,
      email,
      from_email,
      city,
      state_id,
      pincode,
      address,
      attendace_radius,
      longitude,
      lattitude,
      weekly_off_pattern,
      firstname,
      lastname,
      password
    } = this.state;

    let alert;

    switch (this.state.response) {
      case 1:
        alert = (
          <div className="alert alert-success"> Record added successfully!</div>
        );
        window.scrollTo(0, 0);
        break;
      case 0:
        alert = <div className="alert alert-danger">Unable to save!</div>;
        window.scrollTo(0, 0);
        break;
      default:
        alert = " ";
    }

    return (
      <>
        <div className="content">
          <div />
          <Row>
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  {alert}

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
                            value={name}
                            name="name"
                            className="is_required"
                          />
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
                            value={email}
                            name="email"
                          />
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
                            className="is_required"
                            placeholder="Enter Address"
                            type="text"
                            onChange={e =>
                              this.setState({ address: e.target.value })
                            }
                            value={address}
                            name="address"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="Enter City"
                            className="is_required"
                            type="text"
                            onChange={e =>
                              this.setState({ city: e.target.value })
                            }
                            value={city}
                            name="city"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>State</label>

                          <select
                            className="form-control is_required"
                            name="state_id"
                            onChange={e =>
                              this.setState({ state_id: e.target.value })
                            }
                          >
                            {states.map(staticarray => (
                              <option
                                key={staticarray.key}
                                value={staticarray.key}
                              >
                                {staticarray.name}
                              </option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Pincode</label>
                          <Input
                            placeholder="Enter Pincode"
                            className="is_required"
                            type="text"
                            onChange={e =>
                              this.setState({ pincode: e.target.value })
                            }
                            value={pincode}
                            name="pincode"
                          />
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
                                attendace_radius: e.target.value
                              })
                            }
                            value={attendace_radius}
                            name="attendace_radius"
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

                    {this.checkCompanyId() == " " ? (
                      <>
                        <CardHeader>
                          <CardTitle tag="h5">Primary User Details</CardTitle>
                        </CardHeader>

                        <Row>
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>Email</label>
                              <Input
                                placeholder="Enter Email"
                                type="email"
                                onChange={e =>
                                  this.setState({ email: e.target.value })
                                }
                                value={email}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="4">
                            <FormGroup>
                              <label>Password</label>
                              <Input
                                className="is_required"
                                placeholder="Enter Password"
                                type="password"
                                onChange={e =>
                                  this.setState({
                                    password: e.target.value
                                  })
                                }
                                value={password}
                                name="password"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="4">
                            <FormGroup>
                              <label>Enter First Name</label>
                              <Input
                                placeholder="Enter First Name"
                                type="text"
                                onChange={e =>
                                  this.setState({
                                    firstname: e.target.value
                                  })
                                }
                                value={firstname}
                                name="firstname"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>Last Name</label>
                              <Input
                                placeholder="Enter Last Name"
                                type="text"
                                onChange={e =>
                                  this.setState({ lastname: e.target.value })
                                }
                                value={lastname}
                                name="lastname"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="4">
                            <FormGroup>
                              <label>Gender</label>

                              <select
                                className="form-control"
                                onChange={e =>
                                  this.setState({ gender: e.target.value })
                                }
                              >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                              </select>
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      "   "
                    )}

                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          {this.checkCompanyId() == " "
                            ? "Add Company"
                            : "Update Company"}
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
