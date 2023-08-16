import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Row, Col, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import Selecter from "../components/Selecter";
import Utils from "../helpers/utils";

const AdminCRUDProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalShow, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [page, setPage] = useState(0);
  const [pageLength, setPageLength] = useState(5);
  const [pagingItems, setPagingItems] = useState([]);
  const [search, setSearch] = useState("");

  const defaultImgUrl =
    "http://localhost/clotheshop/public/data/images/default.jpg";
  const [imagePreView, setImagePreView] = useState(defaultImgUrl);
  const inputFilePef = useRef();

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreView(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue("Image", e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      ProductID: 0,
      ProductName: "",
      Size: "",
      Color: "",
      Price: 0,
      Quantity: 0,
      Image: undefined,
      CategoryID: 0,
    },
    validationSchema: Yup.object({
      ProductID: Yup.number().required(),
      ProductName: Yup.string("Name is required.")
        .required()
        .min(2, "At least 2 characters"),
      Size: Yup.string("").required(),
      Price: Yup.number().required(),
      Quantity: Yup.number().required(),
      Image: Yup.string("").required(),
      // CategoryID: Yup.string("").required(),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleChangePageLength = (e) => {
    setPage(0);
    setPageLength(e.target.value);
  };
  const handleChangeSearch = (e) => {
    setPage(0);
    setSearch(e.target.value);
  };

  useEffect(() => {
    loadData();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageLength, search]);

  useEffect(() => {
    loadDataCategory();
  }, []);
  const loadData = () => {
    productService.getPaging(page, pageLength, search).then((res) => {
      setProducts(res.data);
      //set pagination
      let items = [
        <Pagination.Item key="first" onClick={() => setPage(0)}>
          &laquo;
        </Pagination.Item>,
      ];
      for (let i = 0; i < res.pagingInfo.totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
      items.push(
        <Pagination.Item
          key="last"
          onClick={() => setPage(res.pagingInfo.totalPages - 1)}
        >
          &raquo;
        </Pagination.Item>
      );
      setPagingItems(items);
    });
  };
  const loadDataCategory = () => {
    categoryService.list().then((res) => {
      const listItems = res.data.map((x) => {
        return { id: x.CategoryID, name: x.CategoryName };
      });
      setCategories(listItems);
    });
  };
  const handleDelete = (e, ProductID) => {
    e.preventDefault();
    productService.delete(ProductID).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warn("Delete successful!!");
      } else {
        toast.error("Delete failed!!");
      }
    });
  };

  const showModalHandler = (e, ProductID) => {
    if (e) e.preventDefault();
    if (ProductID > 0) {
      productService.get(ProductID).then((res) => {
        if (res.data.Image.length > 0) setImagePreView(res.data.Image);
        else setImagePreView(defaultImgUrl);
        delete res.data.Image;
        formik.setValues(res.data);
        handleModalShow();
      });
    } else {
      formik.resetForm();
      setImagePreView(defaultImgUrl);
      handleModalShow();
    }
  };
  const handleFormSubmit = (data) => {
    if (data.ProductID === 0) {
      productService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add successful");
        } else toast.error(res.message);
      });
    } else {
      productService.update(data.ProductID, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update successful");
        } else toast.error(res.message);
      });
    }
  };
  return (
    <div className="main_slider">
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col">
            <div className="row flex-lg-nowrap">
              <div className="col mb-3">
                <div className="e-panel card">
                  <div className="card-body">
                    <div className="card-title">
                      <h6 className="mr-2">
                        <span>Product</span>
                        <small className="px-1">Details</small>
                      </h6>
                    </div>
                    <div className="mb-2">
                      <Row>
                        <Col>
                          <Row className="gx-1">
                            <label className="col-form-label col-sm-auto">
                              Show
                            </label>
                            <Col sm="auto">
                              <select
                                value={pageLength}
                                style={{ width: "80px" }}
                                onChange={handleChangePageLength}
                                className="form-select shadow-none"
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                              </select>
                            </Col>
                            <label className="col-form-label col-sm-auto">
                              entries{" "}
                            </label>
                          </Row>
                        </Col>
                        <Col xs="auto">
                          <label>Search by Name </label>
                          <input
                            type="text"
                            className="form-control"
                            value={search}
                            onChange={handleChangeSearch}
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="e-table">
                      <div className="table-responsive table-lg mt-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="align-top">Id</th>
                              <th>Photo</th>
                              <th className="max-width">Product Name</th>
                              <th className="sortable">Size</th>
                              <th className="sortable">Color</th>
                              <th className="sortable">Price</th>
                              <th className="sortable">Quantity</th>
                              <th className="sortable">Category</th>
                              <th className="sortable">Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((aProduct, idx) => (
                              <tr key={aProduct.ProductID}>
                                <td className="text-center">
                                  {page * pageLength + idx + 1}
                                </td>
                                <td>
                                  <img
                                    style={{ width: "80px", height: "80px" }}
                                    src={aProduct.Image}
                                    alt=""
                                  />
                                </td>
                                <td className="text-center align-middle">
                                  {aProduct.ProductName}
                                </td>
                                <td className="text-center align-middle">
                                  {aProduct.Size}
                                </td>
                                <td className="text-center align-middle">
                                  {aProduct.Color}
                                </td>
                                <td className="text-center align-middle">
                                  {aProduct.Price}
                                </td>

                                <td className="text-center align-middle">
                                  {aProduct.Quantity}
                                </td>
                                <td className="text-center align-middle">
                                  {aProduct.category.CategoryName}
                                </td>

                                <td className="text-center align-middle">
                                  <div className="btn-group align-top">
                                    <button
                                      className="btn btn-sm btn-outline-secondary badge"
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#user-form-modal"
                                      onClick={(e) =>
                                        showModalHandler(e, aProduct.ProductID)
                                      }
                                      style={{
                                        color: "black",
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-secondary badge"
                                      type="button"
                                      onClick={(e) =>
                                        handleDelete(e, aProduct.ProductID)
                                      }
                                    >
                                      <i className="bi-trash-fill text-danger"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Pagination className="mb-0 justify-content-center">
                          {pagingItems}
                        </Pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center px-xl-3">
                      <button
                        className="btn btn-success btn-block"
                        type="button"
                        data-toggle="modal"
                        data-target="#user-form-modal"
                        onClick={() => showModalHandler(null, 0)}
                      >
                        New Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Moda */}
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {major.id > 0 ? "Update" : "New"} */}
            Product
            <small className="text-muted">
              {formik.values.ProductID > 0 ? " Update" : " New"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" className="text-center">
              <img
                src={imagePreView}
                alt=""
                className="img-thumbnail   border-primary d-block"
              />
              <input
                type="file"
                accept="image/*"
                className="d-none"
                ref={inputFilePef}
                onChange={handleChangeImage}
              />
              <div className="mt-2 mr-3 align-baseline">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => inputFilePef.current.click()}
                  style={{ background: "green" }}
                >
                  Upload
                </Button>
                {/* <Button
                  variant="primary"
                  size="sm"
                  className="ms  ml-3"
                  // onClick={dowloadImage}
                >
                  <i className="fa fa-download" />
                </Button> */}
              </div>
            </Col>
            <Col>
              <form>
                <Input
                  label="Product Name"
                  type="text"
                  frmField={formik.getFieldProps("ProductName")}
                  errMessage={
                    formik.touched.ProductName && formik.errors.ProductName
                  }
                />
                {/* <select name="Size" type=>
                  <option
                    value={"M"}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.Size === "M"}
                  >
                    M
                  </option>
                  <option
                    value={"L"}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.Size === "L"}
                  >
                    L
                  </option>
                </select> */}
                <Input
                  label="Size"
                  type="text"
                  frmField={formik.getFieldProps("Size")}
                  errMessage={formik.touched.Size && formik.errors.Size}
                />
                <Input
                  label="Color"
                  type="text"
                  frmField={formik.getFieldProps("Color")}
                  errMessage={formik.touched.Color && formik.errors.Color}
                />
                <Input
                  label="Price"
                  type="text"
                  frmField={formik.getFieldProps("Price")}
                  errMessage={formik.touched.Price && formik.errors.Price}
                />

                <Input
                  label="Quantity"
                  type="text"
                  frmField={formik.getFieldProps("Quantity")}
                  errMessage={formik.touched.Quantity && formik.errors.Quantity}
                />
                {/* <Input
                  label="txtcate"
                  type="text"
                  frmField={formik.getFieldProps("CategoryID")}
                  errMessage={
                    formik.touched.CategoryID && formik.errors.CategoryID
                  }
                /> */}
                <Selecter
                  id="CategoryID"
                  label="CategoryID"
                  type="text"
                  frmField={formik.getFieldProps("CategoryID")}
                  errMessage={
                    formik.touched.CategoryID && formik.errors.CategoryID
                  }
                  data={categories}
                ></Selecter>
              </form>
            </Col>
          </Row>
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
    </div>
  );
};

export default AdminCRUDProduct;
