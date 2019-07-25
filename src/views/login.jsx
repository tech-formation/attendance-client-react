import React, { Component } from "react";
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

import { USER_LOGIN } from "config/endpoints.js";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      is_submit: false
    };
  }

  /*   Form Submit */

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ is_submit: true });
    let redirect = this.props;
    axios
      .post(USER_LOGIN, {
        email: this.state.email,
        password: this.state.password
      })
      .then(function(response) {
         // console.log(response.data.token)
        redirect.history.push("/admin/companies")
        
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  //   form validations
  getValidationsErrors() {
    const { is_submit, email, password } = this.state;

    const error_email = is_submit && !email ? "Email is required" : null;
    const error_password =
      is_submit && !password ? "Password is required" : null;

    return {
      error_email,
      error_password
    };
  }

  render() {
    const { email, password } = this.state;

    const { error_email, error_password } = this.getValidationsErrors();

    return (
      <>
        <div className="content bg-light" style={{ overflow: "hidden" }}>
          <Row
            className="d-flex align-items-center "
            style={{ height: 100 + "vh" }}
          >
            <Col md="4 offset-md-4">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5" className="text-center">
                    Login
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            //defaultValue="Melbourne, Australia"
                            placeholder="example@gmail.com"
                            type="email"
                            value={email}
                            name="email"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                            invalid={error_email ? true : false}
                          />
                          <FormFeedback>{error_email}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e =>
                              this.setState({ password: e.target.value })
                            }
                            invalid={error_password ? true : false}
                          />
                          <FormFeedback>{error_password}</FormFeedback>
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
                          Login
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

export default Login;
