import React from "react";
import { REGISTER_COMPANY, EDIT_COMPANY } from "config/endpoints.js";
import axios from "axios";
import states from "config/constants/states";

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
    this.getCompany(id);
    this.checkCompanyId();
  }

  getCompany = prop => {
    let userToken = localStorage.getItem("token");
    axios
      .get(EDIT_COMPANY + prop, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(Response => Response)
      .then(findresponse => {
        this.setState({
          name: findresponse.data.data[0].name,
          email: findresponse.data.data[0].email,
          from_email: findresponse.data.data[0].from_email,
          city: findresponse.data.data[0].city,
          state_id: findresponse.data.data[0].state_id,
          pincode: findresponse.data.data[0].pincode,
          address: findresponse.data.data[0].address,
          attendace_radius: findresponse.data.data[0].attendace_radius,
          longitude: findresponse.data.data[0].longitude,
          lattitude: findresponse.data.data[0].lattitude,
          weekly_off_pattern: findresponse.data.data[0].weekly_off_pattern,
          firstname: findresponse.data.data[0].firstname,
          lastname: findresponse.data.data[0].lastname,
          password: findresponse.data.data[0].password,
          gender: findresponse.data.data[0].gender,
          response: findresponse.data.data[0].response
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

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
      attendace_radius,
      longitude,
      lattitude,
      weekly_off_pattern,
      firstname,
      lastname,
      password,
      gender
    } = this.state;
    let response = 0;
    const error_name = is_submit && !name ? "This field is required" : null;
    const error_email = is_submit && !email ? "This field is required" : null;
    const error_from_email =
      is_submit && !from_email ? "This field is required" : null;
    const error_city = is_submit && !city ? "This field is required" : null;
    const error_state_id =
      is_submit && !state_id ? "This field is required" : null;
    const error_pincode =
      is_submit && !pincode ? "This field is required" : null;
    const error_address =
      is_submit && !address ? "This field is required" : null;
    const error_attendace_radius =
      is_submit && !attendace_radius ? "This field is required" : null;
    const error_longitude =
      is_submit && !longitude ? "This field is required" : null;
    const error_lattitude =
      is_submit && !lattitude ? "This field is required" : null;
    const error_weekly_off_pattern =
      is_submit && !weekly_off_pattern ? "This field is required" : null;
    const error_firstname =
      is_submit && !firstname ? "This field is required" : null;
    const error_lastname =
      is_submit && !lastname ? "This field is required" : null;
    const error_password =
      is_submit && !password ? "This field is required" : null;

    return {
      error_name,
      error_email,
      error_from_email,
      error_city,
      error_state_id,
      error_pincode,
      error_address,
      error_attendace_radius,
      error_longitude,
      error_lattitude,
      error_weekly_off_pattern,
      error_firstname,
      error_lastname,
      error_password
    };
  }

  // Save Data Method
  saveCompany() {
    let data = this.state;
    let userToken = localStorage.getItem("token");
    axios
      .post(REGISTER_COMPANY, data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(res => {
        this.setState({
          response: res.data.status
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // update Company
  updateCompany() {
    const id = this.props.match.params.id;
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    data.append("from_email", this.state.from_email);
    data.append("city", this.state.city);
    data.append("state_id", this.state.state_id);
    data.append("pincode", this.state.pincode);
    data.append("address", this.state.address);
    data.append("attendace_radius", this.state.attendace_radius);
    data.append("weekly_off_pattern", this.state.weekly_off_pattern);
    data.append("longitude", this.state.longitude);
    data.append("lattitude", this.state.lattitude);
    let userToken = localStorage.getItem("token");
    axios
      .post(EDIT_COMPANY + id, data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(res => {
        this.setState({
          response: res.data.status
        });
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
    console.log(this.props.match.params.id);
    if (typeof this.props.match.params.id == "undefined") {
      this.saveCompany();
    } else {
      this.updateCompany();
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

    const {
      error_name,
      error_email,
      error_city,
      error_state_id,
      error_pincode,
      error_address,
      error_password,
      error_firstname,
      error_lastname
    } = this.getValidationsErrors();

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

                          <select
                            className="form-control"
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
                                invalid={error_pincode ? true : false}
                                value={email}
                              />
                              <FormFeedback>{error_pincode}</FormFeedback>
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="4">
                            <FormGroup>
                              <label>Password</label>
                              <Input
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
                              <FormFeedback>{error_password}</FormFeedback>
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
                              <FormFeedback>{error_firstname}</FormFeedback>
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
                                invalid={error_lastname ? true : false}
                                value={lastname}
                                name="lastname"
                              />
                              <FormFeedback>{error_lastname}</FormFeedback>
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
