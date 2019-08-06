import axios from "axios";
import { GET_COMPANIES } from "config/endpoints";
import { serverValidations } from "config/validation";

/**
 *  Get Companies
 * @param {*} thisPar = this
 * @param {*} thisProps = this.props
 * @param {*} url = url
 */

export const getCompanies = (thisPar, url) => {
  let userToken = localStorage.getItem("token");
  axios
    .get(url, { headers: { Authorization: `Bearer ${userToken}` } })
    .then(findresponse => {
      thisPar.setState({
        companies: findresponse.data.data.data,
        last_page: findresponse.data.data.last_page,
        first_page: findresponse.data.data.from
      });
    })
    .catch(error => {
      console.log("Error fetching and parsing data", error);
    });
};

/**
 *  Delete Companies
 * @param {*} thisPar = this
 * @param {*} thisProps = this.props
 * @param {*} url = url
 * @param {*} id = company id
 */

export const handleDelete = (thisPar, thisProps, url, id) => {
  let userToken = localStorage.getItem("token");
  axios
    .delete(url + `${id}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(Response => {
      getCompanies(thisPar, GET_COMPANIES);
      thisProps.history.push("/admin/companies");
    })
    .catch(error => {
      console.log("Error fetching and parsing data", error);
    });
};

/**
 *  Add Companies
 * @param {*} thisPar = this
 * @param {*} thisState = this.state
 * @param {*} url = url
 */
export const saveCompany = (thisPar, thisState, url, fromFields) => {
  let data = thisState;
  let userToken = localStorage.getItem("token");
  axios
    .post(url, data, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(res => {
      thisPar.setState({
        response: res.data.status
      });
      serverValidations(res.data.message, fromFields, thisState);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 *   Get Company by id
 * @param {*} thisPar = this
 * @param {*} id = company id
 * @param {*} url = url
 */
export const getCompany = (thisPar, id, url) => {
  let userToken = localStorage.getItem("token");
  axios
    .get(url + id, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(Response => Response)
    .then(findresponse => {
      thisPar.setState({
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

/**
 *   Get Company by id
 * @param {*} thisPar = this
 * @param {*} url = url
 * @param {*} thisProp = this.props
 * @param {*} thisState = this.state
 */

export const updateCompany = (
  thisPar,
  url,
  thisProp,
  thisState,
  fromFields
) => {
  let userToken = localStorage.getItem("token");

  const id = thisProp.match.params.id;
  const data = new FormData();
  data.append("name", thisState.name);
  data.append("email", thisState.email);
  data.append("from_email", thisState.from_email);
  data.append("city", thisState.city);
  data.append("state_id", thisState.state_id);
  data.append("pincode", thisState.pincode);
  data.append("address", thisState.address);
  data.append("attendace_radius", thisState.attendace_radius);
  data.append("weekly_off_pattern", thisState.weekly_off_pattern);
  data.append("longitude", thisState.longitude);
  data.append("lattitude", thisState.lattitude);

  axios
    .post(url + id, data, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(res => {
      thisPar.setState({
        response: res.data.status
      });
      serverValidations(res.data.message, fromFields);
    })
    .catch(function(error) {
      console.log(error);
    });
};
