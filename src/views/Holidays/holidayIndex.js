import React from "react";
import { GET_HOLIDAYS } from "config/endpoints";
import { Link } from "react-router-dom";
import { getholidays, deleteHoliday } from "models/holiday";

// reactstrap components
import { Card, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";

class Holidays extends React.Component {
      
  state = {
    value: "",
    holidays: [],
    url: GET_HOLIDAYS,
    search: "",
    sort: "",
    first_page: "",
    last_page: ""
  };

  componentDidMount() {
    getholidays(this, this.state.url);
  };

  tableData() {
    return this.state.holidays.map((object, i) => {
      return (
        <tr key={object.id}>
          <td>{object.id}</td>
          <td>{object.name}</td>
          <td>{object.date}</td>
          <td>{object.year}</td>
          <td>
          <Link
            className="btn btn-sm"
              to={`/admin/holiday/edit/${object.id}`}
          >
            Edit
          </Link>
          &nbsp;
          <button
            className="btn btn-sm"
            onClick={() => { if (window.confirm('Are you sure you wish to delete this record?')) deleteHoliday(this, this.props, object.id) } } 
          >
            Delete
          </button>
        </td>
        </tr>
      );
    });
  }
  
    //search
  searchHoliday = () => {
    let { search } = this.state;
    let url = `${GET_HOLIDAYS}?name=${search}`;
    this.setState({
      url: url
    });
    getholidays(this, url);
  };

  // Sort
  sortByName = () => {
    if(this.state.search !== "" && this.state.sort !== "")
    {
      let { search } = this.state;
      let url = `${GET_HOLIDAYS}?name=${search}&sf=${this.state.sort}&so=asc`;
      this.setState({
        url: url
      });
      getholidays(this, url);
    }
    else{
      let url = `${GET_HOLIDAYS}?sf=${this.state.sort}&so=asc`;
      getholidays(this, url);
    }
  };

  // Pagination
  paginationLink = prop => {
    let url = `${GET_HOLIDAYS}?page=${prop}`;
    this.setState({
      url: url
    });
    getholidays(this, url);
  };

    render() {
      const { search, last_page } = this.state;
      //pagination
      var pagination = [];
      for (let i = 1; i <= last_page; i++) {
        pagination.push(
          <li
            id={(this.state.currentPage === i ? 'active' : '')}
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
      
        return(
            <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" style={{ paddingLeft: 15 + "px" }}>
                  Holidays
                </CardTitle>
                <Row style={{ paddingLeft: 15 + "px" }}>
                <Col md="3" className="pr-0">
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
                      onClick={this.searchHoliday}
                    >
                      Search
                    </Button>
                  </Col>
                <Col md="4">
                  <div className="form-group from-left">
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
                      <option value="id">Sort By</option>
                      <option value="name">Name</option>
                      <option value="year">Year</option>
                      <option value="date">Date</option>
                    </select>
                  </div>
                </Col>
                <Col md="2">
                  <Link to={`/admin/holiday/add`}>
                    <Button value="Search" className="mt-0 p-2">
                      Add Holiday
                    </Button>
                  </Link>
                </Col>
                </Row>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-center">Sr. No.</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Year</th>
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
                    {pagination}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        )
    }
}

export default Holidays;