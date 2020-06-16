import axios from "axios";
import { GET_HOLIDAYS, DELETE_HOLIDAY } from "config/endpoints";
import { serverValidations } from "config/validation";
import { ADD_HOLIDAY, EDIT_HOLIDAY } from "config/endpoints.js";
import moment from "moment";

/**
 *  Get Holidays
 * @param {*} thisPar = this
 * @param {*} thisProps = this.props
 * @param {*} url = url
 */
export const getholidays = (thisPar, url) => {
    let userToken = localStorage.getItem("token");
    axios
      .get(url, { headers: { Authorization: `Bearer ${userToken}` } })
      .then(findresponse => {
        thisPar.setState({
          holidays : findresponse.data.data.data,
          last_page: findresponse.data.data.last_page,
          first_page: findresponse.data.data.from,
          currentPage: findresponse.data.data.current_page
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  /**
 *  Delete Holidays
 * @param {*} thisPar = this
 * @param {*} thisProps = this.props
 * @param {*} url = url
 * @param {*} id = Holiday id
 */
export const deleteHoliday = (thisPar, thisProps, id) => {
    let userToken = localStorage.getItem("token");
    axios
    .delete(DELETE_HOLIDAY + `${id}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(Response => {
      getholidays(thisPar, GET_HOLIDAYS);
      thisProps.history.push("/admin/holidays");
      alert('Record has been deleted successfully.');
    })
    .catch(error => {
      console.log("Error fetching and parsing data", error);
    });
  };

  /**
 *  save holiday
 * @param {*} thisPar = this
 * @param {*} thisState = this.state
 * @param {*} url = url
 */

export const saveHoliday = (thisPar, thisState, formFields) => {
    let userToken = localStorage.getItem("token");
      axios
      .post(ADD_HOLIDAY, thisState, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(res => {
        thisPar.setState({
          response: res.data.status,
          message: res.data.message
        });
        serverValidations(res.data.message, formFields);
      })
      .catch(function(error) {
        console.log(error);
      });

    //Clear state
    getClearState(thisPar);
  };

  /**
 *   Get Holiday by id
 * @param {*} thisPar = this
 * @param {*} id = holiday id
 * @param {*} url = url
 */
  export const getEditHoliday = (thisPar, id, url) => {
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

/**
 *   Get Company by id
 * @param {*} thisPar = this
 * @param {*} url = url
 * @param {*} thisProp = this.props
 * @param {*} thisState = this.state
 */
  export const updateHoliday = (thisPar, thisProp, thisState, formFields) => 
  {
    let userToken = localStorage.getItem("token");
    const id = thisProp.match.params.id;
    const data = new FormData();
    data.append("name", thisState.name);
    data.append("date", moment(thisState.date).format("YYYY-MM-DD"));
    data.append("company_id", thisState.company_id);
    axios
      .post(EDIT_HOLIDAY + id, data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(res => {
        thisPar.setState({
          response: res.data.status,
          message: res.data.message
        });
        serverValidations(res.data.message, formFields);
      })
      .catch(function(error) {
        console.log(error);
      });
      //Clear state
      getClearState(thisPar);
  };

// CLear state after add/edit holiday
  export const getClearState = (thisPar) => {
    thisPar.setState({
      name: "",
      date: "",
      company_id: "",
      is_submit: false
    });
  }