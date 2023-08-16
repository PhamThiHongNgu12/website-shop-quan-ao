import React, { useEffect, useState } from "react";
import "./Product.css";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import Header from "../containers/Header/Header";
import { useCart } from "react-use-cart";
import { Button, Pagination } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import { NavLink } from "react-bootstrap";
// import { useCart } from "react-use-cart";
// import { useSelector } from "react-redux";

const Product = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // const { addItem } = useCart();

  const [page, setPage] = useState(0);
  const [pageLength, setPageLength] = useState(10);
  const [pagingItems, setPagingItems] = useState([]);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const { cateid } = useParams();

  // const handleClick = (lisItems) => {
  //   let isPresent = false;
  //   productService.list().then((res) => {
  //     const listItems = res.data.map((x) => {
  //       return { id: x.ProductID, name: x.ProductName };
  //     });
  //   });
  //   isPresent = true;
  //   if (isPresent) {
  //     setWarning(true);
  //     setTimeout(() => {
  //       setWarning(false);
  //     }, 2000);
  //     return;
  //   }
  //   setCart([...cart, lisItems]);
  // };
  // const handleChange = (item, d) => {
  //   let ind = -1;
  //   cart.forEach((products, index) => {
  //     if (products.id === item.id) ind = index;
  //   });
  //   const tempArr = cart;
  //   tempArr[ind].amount += d;

  //   if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
  //   setCart([...tempArr]);
  // };

  useEffect(() => {
    loadDataProduct();
  }, [cateid, page, search]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    categoryService.list().then((res) => setCategories(res.data));
  };
  const loadDataProduct = () => {
    if (cateid > 0) {
      productService
        .getPagingByCategory(cateid, page, pageLength, search)
        .then((res) => {
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
              key={"last"}
              onClick={() => setPage(res.pagingInfo.totalPages - 1)}
            >
              &raquo;
            </Pagination.Item>
          );
          setPagingItems(items);
        });
    } else {
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
            key={"last"}
            onClick={() => setPage(res.pagingInfo.totalPages - 1)}
          >
            &raquo;
          </Pagination.Item>
        );
        setPagingItems(items);
      });
    }
  };
  const handleChangeSearch = (e) => {
    setPage(0);
    setSearch(e.target.value);
  };
  return (
    <>
      <Header size={cart.length} />
      {/*  <!-- Sidebar -->  /*/}
      <div className="col product_section clearfix">
        <div className="sidebar">
          <div className="sidebar_section">
            <div className="sidebar_title">
              <h5>Product Category</h5>
            </div>

            {categories.map((aCategory, idx) => (
              <ul className="sidebar_categories" key={aCategory.CategoryID}>
                <li className="active">
                  <h5 style={{ color: "#fe4c50" }}>
                    <Link to={`/product/${aCategory.CategoryID}`}>
                      {aCategory.CategoryName}
                    </Link>
                  </h5>
                </li>
                {/* 
                <li>
                  <a href="/#">Men</a>
                </li>
                <li className="active">
                  <a href="/#">
                    <span>
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Women
                  </a>
                </li>
                <li>
                  <a href="/#">Accessories</a>
                </li>
                <li>
                  <a href="/#">New Arrivals</a>
                </li>
                <li>
                  <a href="/#">Collection</a>
                </li>
                <li>
                  <a href="/#">Shop</a>
                </li> */}
              </ul>
            ))}
          </div>

          {/* <!-- Price Range Filtering --> */}
          <div className="sidebar_section">
            <div className="sidebar_title">
              <h5>Filter by Price</h5>
            </div>
            <p>
              <input
                type="text"
                id="amount"
                style={{ border: "0", color: "#f6931f" }}
              />
            </p>
            <div id="slider-range"></div>
            <div className="filter_button">
              <span>filter</span>
            </div>
          </div>

          {/* <!-- Sizes --> */}
          <div className="sidebar_section">
            <div className="sidebar_title">
              <h5>Sizes</h5>
            </div>
            <ul className="checkboxes">
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>S</span>
              </li>
              <li className="active">
                <i className="fa fa-square" aria-hidden="true"></i>
                <span>M</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>L</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>XL</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>XXL</span>
              </li>
            </ul>
          </div>

          {/* <!-- Color --> */}
          <div className="sidebar_section">
            <div className="sidebar_title">
              <h5>Color</h5>
            </div>
            <ul className="checkboxes">
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Black</span>
              </li>
              <li className="active">
                <i className="fa fa-square" aria-hidden="true"></i>
                <span>Pink</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>White</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Blue</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Orange</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>White</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Blue</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Orange</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>White</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Blue</span>
              </li>
              <li>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                <span>Orange</span>
              </li>
            </ul>
            <div className="show_more">
              <span>
                <span>+</span>Show More
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Main Content --> */}

        <div className="main_content">
          {/* <!-- Products --> */}

          <div className="products_iso">
            <div className="row">
              <div className="col">
                {/* <!-- Product Sorting --> */}

                <div className="product_sorting_container product_sorting_container_top">
                  <div className="pages d-flex flex-row align-items-center">
                    <div className="page_current">
                      <span>1</span>
                      <ul className="page_selection">
                        <li>
                          <a href="/#">1</a>
                        </li>
                        <li>
                          <a href="/#">2</a>
                        </li>
                        <li>
                          <a href="/#">3</a>
                        </li>
                      </ul>
                    </div>
                    <div className="page_total">
                      <span>of</span> 3
                    </div>
                    <div id="next_page" className="page_next">
                      <a href="/#">
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* <!-- Product Grid --> */}

                <div
                  className="product-grid w-100 justify-content-center"
                  href="/product-detail"
                >
                  {/* <!-- Product 1 --> */}
                  {products.map((aProduct, idx) => (
                    <div
                      className="product-item mr-2 "
                      key={aProduct.ProductID}
                    >
                      <p hidden>{page * pageLength + idx + 1}</p>
                      <div className="product discount ">
                        <div className="product_image">
                          <img src={aProduct.Image} alt="" />
                        </div>
                        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                          <span>{aProduct.Size}</span>
                        </div>
                        <div className="product_info">
                          <h6 className="product_name">
                            {aProduct.ProductName}
                          </h6>
                          <div className="product_price">
                            {aProduct.Price}vnđ<span></span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="red_button add_to_cart_button"
                        // onClick={() => handleClick()}
                      >
                        add to cart
                      </Button>
                    </div>
                  ))}
                </div>

                {/* <!-- Product Sorting --> */}
                <Pagination className="mb-0 justify-content-center">
                  {pagingItems}
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
