import React from "react";
import { EDIT_HOLIDAY } from "config/endpoints.js";
import { validations } from "config/validation";
import DatePicker from "react-datepicker";
import { saveHoliday, getEditHoliday, updateHoliday } from "models/holiday";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

// reactstrap components
import { Button, Card, CardBody, FormGroup, Form, Input, Row, Col, CardHeader, CardTitle } from "reactstrap";

  class User extends React.Component {

    state = {
        name: "",
        date: new Date(),
        company_id: "",
        type: 2,
        message:'',
        is_submit: false
      };
    
    //submit function
    handleSubmit = (e) => {
      e.preventDefault();
      let formFields = e.target.elements;
      if (validations(e) === true) {
        this.setState({
          company_id : localStorage.getItem("companyId"),
          date: moment(this.state.date).format("YYYY-MM-DD"),
          is_submit : true
        }, () => {
            if (typeof this.props.match.params.id == "undefined") {
              saveHoliday(this, this.state, formFields);
            } else {
              updateHoliday(this, this.props, this.state, formFields);
            }
        });
      }
    };
    
    componentDidMount() {
      const { match } = this.props;
      const id = match.params.id;
      getEditHoliday(this, id, EDIT_HOLIDAY);
      this.checkHolidayId();
    };

    //check for Add new holiday or update edited holiday
    checkHolidayId = () => {
      let id;
      typeof this.props.match.params.id == "undefined"
        ? (id = " ")
        : (id = this.props.match.params.id);
      return id;
    };
    checkHolidayId;
    
    //date-picker change function
    handleChange = date => {
      this.setState({
        date: date
      });
    };

	  //cancel function
	  cancel = () => {
	    this.props.history.push("/admin/holidays");
	  }
    
    render() {
      
    const { name, date } = this.state;

    let alert;
    //Response messages
    switch (this.state.response) {
      case 1:
        alert = (
          <div className="alert alert-success">{this.state.message}</div>
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
                              <label>Date</label> <br/>
                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={date}
                                onChange={date => this.handleChange(date)}
                                className="form-control"
                                value={date}
                                placeholderText="Click to select a date"
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
                                {this.checkHolidayId() === " "
                              ? "Add Holiday"
                              : "Update Holiday"}
                              </Button>
                              <Button
                                className="btn-round"
                                color="primary"
                                onClick={ this.cancel }>
                                  Cancel
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