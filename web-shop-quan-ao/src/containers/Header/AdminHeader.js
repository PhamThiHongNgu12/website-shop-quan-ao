import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";

const AdminHeader = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <>
      <header className="header trans_300 ngu">
        {/* Top Navigation */}
        <div className="top_nav">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="top_nav_left">
                  free shipping on all u.s orders over $50
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="top_nav_right">
                  <ul className="top_nav_menu list-inline-item">
                    {/* Currency / Language / My Account */}
                    <li className="currency">
                      <a href="/#">
                        VND
                        <i className="fa fa-angle-down" />
                      </a>
                    </li>

                    <li className="language">
                      <a href="/#">
                        VietNam
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul className="language_selection">
                        <li>
                          <a href="/#">English</a>
                        </li>
                      </ul>
                    </li>
                    <li className="account w-25">
                      {/* <a href="/#">
                        My Account
                        
                      </a> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Navigation */}
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <a href="/#">
                    colo<span>shop</span>
                  </a>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <a href="/admin/product-admin">Product</a>
                    </li>
                    <li>
                      <a href="/admin/category">Category</a>
                    </li>
                    <li>
                      <a href="/#">Order</a>
                    </li>
                  </ul>
                  <ul className="navbar_user ">
                    <li className="account">
                      <Nav.Link as={NavLink} to="/#" className="row">
                        <i className="bi bi-person-circle mr-2"></i>
                        {/* Welcome to  */}

                        {userInfo.fullName}
                      </Nav.Link>

                      <ul className="account_selection col text-center">
                        <li>
                          <a href="/#" className=" row ">
                            <i className="bi bi-person-vcard" />
                            Profile
                          </a>
                        </li>
                        <li>
                          <a href="/#" className="row">
                            <i className="bi bi-person-up" />
                            Update
                          </a>
                        </li>
                        <li>
                          <Link
                            to="/home"
                            className="row"
                            // as={Link} to="/login"
                            onClick={() => dispatch(logout())}
                          >
                            <i className="bi-box-arrow-right" /> Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default AdminHeader;
