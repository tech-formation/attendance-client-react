import React, { Component } from "react";

class TableRow extends Component {
 
  render() {
    return (
      <tr>
        <td>{this.props.obj.id}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.city}</td>
        <td>{this.props.obj.pincode}</td>
        <td>
            <button className="btn btn-sm">Edit</button> &nbsp;
            <button className="btn btn-sm">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
