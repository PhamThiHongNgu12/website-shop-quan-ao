import React, { useEffect, useState } from "react";
import "./Cart.css";
import Header from "../containers/Header/Header";
import { useCart } from "react-use-cart";
import cartService from "../services/cartService";
import memberService from "../services/memberService";
import { toast } from "react-toastify";

const Cart = (props) => {
  const [carts, setCart] = useState([]);

  const [member, setMember] = useState([]);
  carts.map((x) => {
    x.product.map((y) => {
      console.log(y.ProductName);
    });
  });
  console.log(member.id);
  console.log("ll", carts.length - 1);
  useEffect(() => {
    load();
  }, [member.id]);
  const load = () => {
    cartService.getCart(member.id).then((res) => setCart(res.data));
  };
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = () => {
    memberService.profile().then((res) => setMember(res.data));
  };
  const handleDelete = (id) => {
    cartService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        load();
        toast.warn("Delete successful!!");
      } else {
        toast.error("Delete failed!!");
      }
    });
  };

  return (
    <>
      <Header />

      <div className="main_slider">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <h5>Cart({carts.length})</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Shopping Bag
                      </th>
                      <th scope="col">Size</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((item, index) =>
                      item.product.map((product) => (
                        <tr key={index}>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                className="img-fluid rounded-3"
                                style={{ width: "120px" }}
                                src={`http://localhost/clotheshop/public/data/images/${product.Image}`}
                                alt=""
                              />
                              <div className="flex-column ms-4">
                                <p className="mb-2">{product.ProductName}</p>
                              </div>
                            </div>
                          </th>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: 500 }}>
                              {product.Size}
                            </p>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: 500 }}>
                              {product.Price}
                            </p>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex flex-row">
                              <button className="btn btn-link px-2">
                                <i className="fa fa-minus" />
                              </button>
                              <input
                                id="form1"
                                min={0}
                                name="quantity"
                                defaultValue={item.Product_qty}
                                type="number"
                                className="form-control form-control-sm"
                                style={{ width: "50px" }}
                              />
                              <button className="btn btn-link px-2">
                                <i className="fa fa-plus" />
                              </button>
                            </div>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: 500 }}>
                              {product.Price * item.Product_qty}
                            </p>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-sm btn-outline-secondary badge"
                              type="button"
                              onClick={(e) => handleDelete(item.id)}
                            >
                              <i className="fa fa-trash text-danger" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="card shadow-2-strong mb-5 mb-lg-0"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                      <form>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel1v"
                              defaultValue
                              aria-label="..."
                              defaultChecked
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className=" fa fa-cc-mastercard "></i>
                              Credit Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel2v"
                              defaultValue
                              aria-label="..."
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fa fa-cc-visa" />
                              Debit Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel3v"
                              defaultValue
                              aria-label="..."
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fa fa-paypal" />
                              PayPal
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-6">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              siez={17}
                              placeholder="John Smith"
                            />
                            <label className="form-label" htmlFor="typeName">
                              Name on card
                            </label>
                          </div>
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeExp"
                              className="form-control form-control-lg"
                              placeholder="MM/YY"
                              size={7}
                              minLength={7}
                              maxLength={7}
                            />
                            <label className="form-label" htmlFor="typeExp">
                              Expiration
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              siez={17}
                              placeholder="1111 2222 3333 4444"
                              minLength={19}
                              maxLength={19}
                            />
                            <label className="form-label" htmlFor="typeText">
                              Card Number
                            </label>
                          </div>
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="password"
                              id="typeText"
                              className="form-control form-control-lg"
                              placeholder="●●●"
                              size={1}
                              minLength={3}
                              maxLength={3}
                            />
                            <label className="form-label" htmlFor="typeText">
                              Cvv
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">300.000 VND</p>
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0">30.000 VND</p>
                      </div>
                      <hr className="my-4" />
                      <div
                        className="d-flex justify-content-between mb-4"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">330.000 VND</p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                      >
                        <div className="d-flex justify-content-between">
                          <span>Checkout</span>
                          <span>330.000 VND</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
