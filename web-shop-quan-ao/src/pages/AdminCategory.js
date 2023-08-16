import React, { useState, useEffect } from "react";
import categoryService from "../services/categoryService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import AdminHeader from "../containers/Header/AdminHeader";

const AdminCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [modalShow, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      CategoryID: 0,
      CategoryName: "",
    },
    validationSchema: Yup.object({
      CategoryID: Yup.number().required(),
      CategoryName: Yup.string("Name is required.")
        .required()
        .min(2, "At least 2 characters"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleDelete = (e, CategoryID) => {
    e.preventDefault();
    categoryService.delete(CategoryID).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warn("Delete successful!!");
      } else {
        toast.error("Delete failed!!");
      }
    });
  };

  const showModalHandler = (e, CategoryID) => {
    if (e) e.preventDefault();
    if (CategoryID > 0) {
      categoryService.get(CategoryID).then((res) => {
        formik.setValues(res.data);
        handleModalShow();
      });
    } else {
      formik.resetForm();
      handleModalShow();
    }
  };
  const handleFormSubmit = (data) => {
    if (data.CategoryID === 0) {
      categoryService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add successful");
        } else toast.error(res.message);
      });
    } else {
      categoryService.update(data.CategoryID, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update successful");
        } else toast.error(res.message);
      });
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    categoryService.list().then((res) => setCategories(res.data));
  };

  return (
    <>
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
                          <span>Category</span>
                          <small className="px-1">Details</small>
                        </h6>
                      </div>
                      <div className="e-table">
                        <div className="table-responsive table-lg mt-3">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="text-center">Id</th>
                                <th className="max-width">Catygory Name</th>
                                <th className="text-center">Contact</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.map((aCategory, idx) => (
                                <tr key={aCategory.CategoryID}>
                                  <td className="text-center">{idx + 1}</td>
                                  <td>{aCategory.CategoryName}</td>
                                  <td className="text-center align-middle ">
                                    <div className="btn-group align-top">
                                      <button
                                        className="btn btn-sm btn-outline-secondary badge"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#user-form-modal"
                                        style={{
                                          color: "black",
                                        }}
                                        onClick={(e) =>
                                          showModalHandler(
                                            e,
                                            aCategory.CategoryID
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-secondary badge"
                                        type="button"
                                        onClick={(e) =>
                                          handleDelete(e, aCategory.CategoryID)
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
                          onClick={() => showModalHandler(null, 0)}
                        >
                          New Category
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {major.id > 0 ? "Update" : "New"} */}
            Major
            <small className="text-muted">
              {formik.values.CategoryID > 0 ? "edit" : "new"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              label="Category name"
              type="text"
              frmField={formik.getFieldProps("CategoryName")}
              errMessage={formik.touched.name && formik.errors.name}
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

export default AdminCategory;
