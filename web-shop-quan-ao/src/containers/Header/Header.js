import React, { useEffect, useState } from "react";
import { Modal, Nav, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/member";

import memberService from "../../services/memberService";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import "./style.css";
import cartService from "../../services/cartService";

const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userauth.userInfo);
  const isLoggedIns = useSelector((state) => state.userauth.isLoggedIns);
  const [memberprofile, setMemberprofile] = useState([]);
  const [modalShow, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [cart, setCart] = useState([]);
  const item = cart.length;
  // const showModalHandler = (e, MemberID) => {
  //   if (e) e.preventDefault();

  //   if (MemberID > 0) {
  //     memberService.profile(MemberID).then((res) => setMemberprofile(res.data));
  //     handleModalShow();
  //   } else {
  //     handleModalShow();
  //   }
  // };
  console.log("lol", cart);
  useEffect(() => {
    load();
  }, [item, userInfo.MemberID]);
  const load = () => {
    cartService.getCart(userInfo.MemberID).then((res) => setCart(res.data));
  };
  const showModalHandler = (e, MemberID) => {
    if (e) e.preventDefault();

    if (MemberID > 0) {
      memberService.profile().then((res) => setMemberprofile(res.data));

      handleModalShow();
    } else {
      handleModalShow();
    }
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   memberService.profile().then((res) => setMemberprofile(res.data));
  // };
  return (
    <>
      <header className="header trans_300">
        {/* Top Navigation */}
        <div className="top_nav">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="top_nav_left">
                  free shipping on all u.s orders over $50
                </div>
              </div>
              <div className="col-md-3 text-right">
                <div className="top_nav_right">
                  <ul className="top_nav_menu">
                    {/* Currency / Language / My Account */}
                    <li className="currency">
                      <a href="/#">
                        vnd
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul className="currency_selection text-center">
                        {/* <li>
                          <a href="/#">cad</a>
                        </li>
                        <li>
                          <a href="/#">aud</a>
                        </li>
                        <li>
                          <a href="/#">eur</a>
                        </li>
                        <li>
                          <a href="/#">gbp</a>
                        </li> */}
                      </ul>
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
                      <a href="/#">home</a>
                    </li>
                    <li>
                      <a href="/product">shop</a>
                    </li>

                    <li>
                      <Link to="/blog">blog</Link>
                    </li>
                    <li>
                      <a href="/#">contact</a>
                    </li>
                  </ul>
                  <ul className="navbar_user ">
                    <li>
                      <input type="text" className="mr-1" />
                      <i className="fa fa-search " aria-hidden="true" />
                    </li>
                    <li className="checkout ">
                      <a href="/cart">
                        <i className="fa fa-shopping-cart" aria-hidden="true" />
                        <span id="checkout_items" className="checkout_items">
                          {item}
                        </span>
                      </a>
                    </li>
                    <li className="account ">
                      <Nav.Link as={NavLink} to="/#" className="row">
                        <i className="fa fa-user mr-2" />
                        {/* Welcome to  */}
                        <p className="w-100">{userInfo.fullName}</p>
                      </Nav.Link>

                      <ul className="account_selection col text-center">
                        <li>
                          <a href="/logins" className=" row ">
                            <i className="fa fa-sign-in" />
                            SignIn
                          </a>
                        </li>
                        <li>
                          <a
                            href="/logins"
                            className="row"
                            // {members.map((aMember) => (e))}

                            onClick={(e) =>
                              showModalHandler(e, userInfo.MemberID)
                            }
                          >
                            <i className="fa fa-user-plus" />
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="row"
                            // as={Link} to="/login"
                            onClick={() => dispatch(logout())}
                          >
                            <i className="bi-box-arrow-right" /> Logout
                          </a>
                        </li>
                        <li>
                          <Link to="/login" className="row">
                            <i className="fa fa-user-plus" />
                            Admin
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="hamburger_container">
                    <i className="fa fa-bars" aria-hidden="true" />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {major.id > 0 ? "Update" : "New"} */}
            Profile
            <small className="text-muted">
              {/* {formik.values.id > 0 ? "profile" : "new"} */}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="modal-profile">
              <p>
                <i className="bi bi-person-lines-fill mr-2" />
                <span>FullName:</span> {memberprofile.name}
              </p>
            </div>

            <div className="modal-profile">
              <p>
                <i className="bi bi-envelope-at mr-2" />
                <span>Email:</span> {memberprofile.email}
              </p>
            </div>
            <div className="modal-profile">
              <p>
                <i className="bi bi-telephone-fill mr-2" />
                <span>Phone:</span> {memberprofile.phone}
              </p>
            </div>
            <div className="modal-profile">
              <p>
                <i className="bi bi-person-circle mr-2" />
                <span>username:</span> {memberprofile.username}
              </p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default Header;
