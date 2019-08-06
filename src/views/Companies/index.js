import React from "react";
import { GET_COMPANIES  , DELETE_COMPANY } from "config/endpoints";
import { Link } from "react-router-dom";
import { getCompanies, handleDelete } from "models/company";

// reactstrap components
import { Card, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";

class Companies extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: "",
    companies: [],
    url: GET_COMPANIES,
    search: "",
    sort: "",
    first_page: "",
    last_page: ""
  };

  componentDidMount() {
    getCompanies(this, this.state.url);
  }

  tableData() {
    return this.state.companies.map((object, i) => {
      return (
        <tr key={object.id}>
          <td>{object.id}</td>
          <td>{object.email}</td>
          <td>{object.address}</td>
          <td>{object.city}</td>
          <td>{object.pincode}</td>
          <td>
            <Link
              className="btn btn-sm"
              to={`/admin/company/edit/${object.id}`}
            >
              Edit
            </Link>
            &nbsp;
            <button
              className="btn btn-sm"
              onClick={() => handleDelete(this, this.props,DELETE_COMPANY ,object.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  //search
  searchCompany = () => {
    let { search } = this.state;
    let url = `${GET_COMPANIES}?search=${search}`;
    this.setState({
      url: url
    });
    getCompanies(this, url);
  };

  // Pagination
  paginationLink = prop => {
    let url = `${GET_COMPANIES}?page=${prop}`;
    this.setState({
      url: url
    });
    getCompanies(this, url);
  };

  // Sort
  sortByName = () => {
    let url = `${GET_COMPANIES}?sf=${this.state.sort}&so=asc`;
    getCompanies(this, url);
  };

  render() {
    const { search, last_page } = this.state;

    //pagination
    var pagination = [];
    for (let i = 1; i <= last_page; i++) {
      pagination.push(
        <li
          className="page-item"
          key={i}
          onClick={() => this.paginationLink(i)}
        >
          <a className="page-link" href="#">
            {i}
          </a>
        </li>
      );
    }

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>

                <CardTitle tag="h4" style={{ paddingLeft: 15 + "px" }}>
                  Companies
                </CardTitle>

                <Row style={{ paddingLeft: 15 + "px" }}>

                  <Col md="3" className="pr-0">
                    <label>Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={search}
                      onChange={e => this.setState({ search: e.target.value })}
                    />
                  </Col>

                  <Col md="1" className="pl-0">
                    <label style={{ visibility: "hidden" }}>search</label>
                    <Button
                      color="info"
                      type="submit"
                      value="Search"
                      className="mt-0 p-2"
                      onClick={this.searchCompany}
                    >
                      Search
                    </Button>
                  </Col>

                  <Col md="6">
                    <div className="form-group from-left">
                      <label>Sort By</label>
                      <select
                        className="form-control w-50 "
                        id="exampleFormControlSelect1"
                        style={{ height: `${35}px`, padding: `${0}px` }}
                        onChange={e =>
                          this.setState(
                            { sort: e.target.value },
                            this.sortByName
                          )
                        }
                      >
                        <option>Please Select</option>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                        <option value="city">City</option>
                      </select>
                    </div>
                  </Col>

                  <Col md="2">
                    <label style={{ visibility: "hidden" }}>Sort By</label>
                    <Link to={`/admin/company/Add`}>
                      <Button value="Search" className="mt-0 p-2">
                        Add Company
                      </Button>
                    </Link>
                  </Col>
                </Row>

                <CardBody>

                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">City</th>
                        <th className="text-center">Pincode</th>
                        <th
                          className="text-center"
                          style={{ width: 200 + "px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">{this.tableData()}</tbody>
                  </Table>
                  
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        {" "}
                        Prev
                      </a>
                    </li>
                    {pagination}
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Companies;
