import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "./../../services/userService";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import CustomButton from "../../components/CustomButton";
import store from "./../../store/index";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import memberService from "./../../services/memberService";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const [isWaiting, setIsWaiting] = useState(false);
  const [modalShow, setShowModal] = useState(false);

  const [members, setMembers] = useState([]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string("Name is required.")
        .required()
        .min(2, "At least 2 characters"),
    }),
    onSubmit: (values) => {
      // handleFormSubmit(values);
    },
  });

  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();
    if (id > 0) {
      memberService.get(id).then((res) => {
        formik.setValues(res.data);
        handleModalShow();
      });
    } else {
      formik.resetForm();
      handleModalShow();
    }
  };

  // const handleFormSubmit = (data) => {
  //   if (data.id === 0) {
  //     memberService.add(data).then((res) => {
  //       if (res.errorCode === 0) {
  //         // loadDataMember();
  //         handleModalClose();
  //         toast.success("Add successful");
  //       } else toast.error(res.message);
  //     });
  //   } else {
  //     memberService.update(data.id, data).then((res) => {
  //       if (res.errorCode === 0) {
  //         // loadDataMember();
  //         handleModalClose();
  //         toast.success("Update successful");
  //       } else toast.error(res.message);
  //     });
  //   }
  // };
  // useEffect(() => {
  //   loadDataMember();
  // }, []);

  // const loadDataMember = () => {
  //   memberService.list().then((res) => res.data);
  // };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    setIsWaiting(true);
    userService.login(username, password).then((res) => {
      setIsWaiting(false);
      if (res.errorCode === 0) {
        setMessage("");
        // console.log(usernameRef, passwordRef);
        dispatch(
          login({
            token: res.data.token,
            userInfo: res.data,
          })
        );

        navigate("/admin/category");
      } else {
        setMessage(res.message);
      }
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={formSubmitHandler}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span
                            className="h1 fw-bold mb-0"
                            style={{ color: "#fe4c50" }}
                          >
                            Color
                          </span>
                          <span className="h1 fw-bold mb-0">Shop</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <Input
                            inputRef={usernameRef}
                            id="txtUsername"
                            label="User name"
                            type="text"
                            maxLength="50"
                            autoComplete="off"
                            placeholder="Enter username"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <Input
                            inputRef={passwordRef}
                            id="txtPassword"
                            label="Password"
                            type="password"
                            maxLength="100"
                            placeholder="Enter password"
                          />
                        </div>
                        <p className="text-center text-danger">{message}</p>
                        <div className="btn-login">
                          <CustomButton
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            disabled={isWaiting}
                            isLoading={isWaiting}
                          >
                            Login
                          </CustomButton>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <a
                            href="#!"
                            style={{ color: "#393f81" }}
                            onClick={() => showModalHandler(null, 0)}
                          >
                            Register here
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {major.id > 0 ? "Update" : "New"} */}
            Account
            <small className="text-muted">
              {formik.values.id > 0 ? "profile" : "new"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              label=" Full Name"
              type="text"
              frmField={formik.getFieldProps("name")}
              errMessage={formik.touched.name && formik.errors.name}
            />
            <Input
              label="Email"
              type="text"
              frmField={formik.getFieldProps("email")}
              errMessage={formik.touched.email && formik.errors.email}
            />
            <Input
              label=" UserName"
              type="text"
              frmField={formik.getFieldProps("username")}
              errMessage={formik.touched.username && formik.errors.username}
            />
            <Input
              label="Password"
              type="text"
              frmField={formik.getFieldProps("password")}
              errMessage={formik.touched.password && formik.errors.password}
            />
            <Input
              label="Phone"
              type="text"
              frmField={formik.getFieldProps("phone")}
              errMessage={formik.touched.phone && formik.errors.phone}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
