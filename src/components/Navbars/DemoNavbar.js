import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "modules/Users/selectors"
import { connect } from "react-redux";
import { setUser } from "modules/Users/actions";
import { createStructuredSelector } from "reselect";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent"
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle(e) {
    e.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  logoutUser = () => {
      localStorage.clear();
      this.props.history.push("/login");
  }

  // getBrand() {
  //   let brandName = "Default Brand";
  //   routes.map((prop, key) => {
  //     if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
  //       brandName = prop.name;
  //     }
  //     return null;
  //   });
  //   return brandName;
  // }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
     var user =    JSON.parse(localStorage.getItem('user'));
     //TODO: GET USER OBJECT FROM SERVER
     this.props.setUser(user);
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
    
        <Container fluid>  
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
        
            <Nav navbar>  
              <NavItem>
           { this.props.user.firstname } &nbsp;&nbsp;&nbsp;
              </NavItem>
            </Nav>
           
            <Nav navbar>  
              <NavItem>
                 <Link to="" onClick={ this.logoutUser }>Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}



/**
 * Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  user  : getUser()
});

/**
 * Export the component
 */
export default connect(
  mapStateToProps,
  {
    setUser
  }
)(Header);

