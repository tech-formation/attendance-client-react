import React, { Component } from "react";
import { USER_LOGIN } from "config/endpoints.js";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "modules/Users/actions";
import { func } from "prop-types";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import { Link } from "react-router-dom";

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

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    is_submit: false,
    emessage: false
  };
  componentDidMount() {
    //check login
    let userToken = localStorage.getItem("token");
   
    if (userToken === null) {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/admin/companies");
    }
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
      .then(response => {
        if (response.data.status === 1) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("companyId", response.data.user.company_id);
          redirect.history.push("/admin/companies");
        } else {
          this.setState({ emessage: true });
        }
      })
      .catch(error => {
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
    const { email, password, emessage } = this.state;
    const { error_email, error_password } = this.getValidationsErrors();
    const messageAlert = (
      <div class="alert alert-danger" role="alert">
        Invalid username and password!
      </div>
    );
    return (
      <>
        <div className="content bg-light" style={{ overflow: "hidden" }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={`/home`}>Home</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <Row
            className="d-flex align-items-center "
            style={{ height: 100 + "vh" }}
          >
            <Col md="4 offset-md-4">
              {this.state.emessage === true ? messageAlert : " "}
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

Login.propTypes = {
  setUser: func.isRequired
};

export default connect(
  null,
  {
    setUser
  }
)(Login);
