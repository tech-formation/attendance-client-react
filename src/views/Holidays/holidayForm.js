import React from "react";
import { ADD_HOLIDAY, EDIT_HOLIDAY } from "config/endpoints.js";
import axios from "axios";
import { serverValidations } from "config/validation";
import { validations } from "config/validation";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

// reactstrap components
import { Button, Card, CardBody, FormGroup, Form, Input, Row, Col, CardHeader, CardTitle } from "reactstrap";

  class User extends React.Component {

    state = {
        name: "",
        date: new Date(),
        company_id: "",
        type: 1,
        act: 0,
        message:'',
        is_submit: false
      };
    
    //submit function
    handleSubmit = (e) => {
      e.preventDefault();
      let formFields = e.target.elements;
      this.setState({ is_submit: true });
      if (validations(e) === true) {
        this.saveHoliday(formFields);
      }
    };

    //save holiday
    saveHoliday = (formFields) => {
      let userToken = localStorage.getItem("token");
      let companyId = localStorage.getItem("companyId");
      const formattedDate = moment(this.state.date).format("YYYY-MM-DD");
      this.setState({
        company_id: localStorage.getItem("companyId"),
        date: formattedDate,
      }, function(){
        //new holiday add
        if(this.state.act === 0)
        {
          axios
          .post(ADD_HOLIDAY, this.state, {
            headers: { Authorization: `Bearer ${userToken}` }
          })
          .then(res => {
            this.setState({
              response: res.data.status,
              message: res.data.message
            });
            serverValidations(res.data.message, formFields);
          })
          .catch(function(error) {
            console.log(error);
          });
        }
        else
        {
          //update holiday
          const { match } = this.props;
          const id = match.params.id;
          const data = new FormData();
          data.append("name", this.state.name);
          data.append("date", moment(this.state.date).format("YYYY-MM-DD"));
          data.append("company_id", companyId);
          axios
            .post(EDIT_HOLIDAY + id, data, {
              headers: { Authorization: `Bearer ${userToken}` }
            })
            .then(res => {
              this.setState({
                response: res.data.status,
                message: res.data.message
              });
              serverValidations(res.data.message, formFields);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
        //Clear state
        this.setState({
          name: "",
          date: "",
          company_id: "",
          act: 0,
          is_submit: false
        });
      });
    };
    
    componentDidMount() {
      const { match } = this.props;
      const id = match.params.id;
      this.getEditHoliday(this, id, EDIT_HOLIDAY);
      this.checkHolidayId();
    };

    //get data on edit record
    getEditHoliday = (thisPar, id, url) => {
      let userToken = localStorage.getItem("token");
      axios
        .get(url + id, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        .then(Response => Response)
        .then(findresponse => {
          const formattedDate = new Date(findresponse.data.data[0].date);
          thisPar.setState({
            name: findresponse.data.data[0].name,
            date: formattedDate,
            company_id: findresponse.data.data[0].company_id,
            act: 1
          });
        })
        .catch(error => {
          console.log("Error fetching and parsing data", error);
        });
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