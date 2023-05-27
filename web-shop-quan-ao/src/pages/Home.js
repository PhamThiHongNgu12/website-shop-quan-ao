import React, { useEffect, useRef, useState } from "react";
import Header from "../containers/Header/Header";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    // loadData();
    loadDataProduct();
  }, []);

  // const loadData = () => {
  //   categoryService.list().then((res) => setCategories(res.data));
  // };
  const loadDataProduct = () => {
    productService.list().then((res) => setproducts(res.data));
  };
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          " : " +
          (minutes > 9 ? minutes : "0" + minutes) +
          " : " +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("24:00:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 86400);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  // const onClickReset = () => {
  //   clearTimer(getDeadTime());
  // };
  return (
    <>
      <Header />
      <div
        className="main_slider"
        style={{ backgroundImage: "url('images/slider_1.jpg')" }}
      >
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div className="main_slider_content">
                <h6>Spring / Summer Collection 2017</h6>
                <h1>Get up to 30% Off New Arrivals</h1>
                <div className="red_button shop_now_button">
                  <a href="/#">shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner */}
        <div className="banner">
          <div className="container ">
            <div className="row">
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "URL(images/banner_1.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="categories.html">women's</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "url(images/banner_2.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="categories.html">accessories's</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: "url(images/banner_3.jpg)" }}
                >
                  <div className="banner_category">
                    <a href="categories.html">men's</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new_arrivals ">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>New Arrivals</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="new_arrivals_sorting">
                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                  <li
                    className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked"
                    data-filter="*"
                  >
                    all
                  </li>
                  <li
                    className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                    data-filter=".women"
                  >
                    women's
                  </li>
                  <li
                    className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                    data-filter=".accessories"
                  >
                    accessories
                  </li>
                  <li
                    className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
                    data-filter=".men"
                  >
                    men's
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" product-grid  justify-content-center">
            {products.map((aProduct, idx) => (
              <div key={aProduct.ProductID} className="product-item  mr-2  ">
                <div className="product discount  ">
                  <div className="product_image">
                    <img src={aProduct.Image} alt="" />
                  </div>
                  <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                    <span>-$20</span>
                  </div>
                  <div className="product_info">
                    <h6 className="product_name">{aProduct.ProductName}</h6>
                    <div className="product_price">
                      {aProduct.Price}đ
                      <br />
                      <span>{aProduct.Discount}đ</span>
                    </div>
                  </div>
                </div>
                <div className="red_button add_to_cart_button ">
                  <a href="/#">add to cart</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Deal of the week --> */}

        <div className="deal_ofthe_week">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="deal_ofthe_week_img">
                  <img src="images/deal_ofthe_week.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 text-right deal_ofthe_week_col">
                <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                  <div className="section_title">
                    <h2>Deal Of The Week</h2>
                  </div>
                  <ul className="timer">
                    <h2 style={{ color: "#fe4c50" }}>{timer}</h2>
                  </ul>
                  <div className="red_button deal_ofthe_week_button">
                    <Link to="/product">shop now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Best Sellers*/}

        {/* <!-- Benefit --> */}
        <div className="benefit">
          <div className="container">
            <div className="row benefit_row">
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-truck" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>free shipping</h6>
                    <p>Suffered Alteration in Some Form</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-money" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>cach on delivery</h6>
                    <p>The Internet Tend To Repeat</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-undo" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>45 days return</h6>
                    <p>Making it Look Like Readable</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                  </div>
                  <div className="benefit_content">
                    <h6>opening all week</h6>
                    <p>8AM - 09PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Blogs */}
          <div className="blogs">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <div className="section_title">
                    <h2>Latest Blogs</h2>
                  </div>
                </div>
              </div>
              <div className="row blogs_container">
                <div className="col-lg-4 blog_item_col">
                  <div className="blog_item">
                    <div
                      className="blog_background"
                      style={{ backgroundImage: "url(images/blog_1.jpg)" }}
                    />
                    <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                      <h4 className="blog_title">
                        Here are the trends I see coming this fall
                      </h4>
                      <span className="blog_meta">by admin | dec 01, 2017</span>
                      <a
                        className="blog_more"
                        href="https://www.vogue.com/article/fall-2022-trends-editor-picks"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 blog_item_col">
                  <div className="blog_item">
                    <div
                      className="blog_background"
                      style={{ backgroundImage: "url(images/blog_2.jpg)" }}
                    />
                    <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                      <h4 className="blog_title">
                        Here are the trends I see coming this fall
                      </h4>
                      <span className="blog_meta">by admin | dec 01, 2017</span>
                      <a
                        className="blog_more"
                        href="https://www.vogue.com/article/fall-2022-trends-editor-picks"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 blog_item_col">
                  <div className="blog_item">
                    <div
                      className="blog_background"
                      style={{ backgroundImage: "url(images/blog_3.jpg)" }}
                    />
                    <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                      <h4 className="blog_title">
                        Here are the trends I see coming this fall
                      </h4>
                      <span className="blog_meta">by admin | dec 01, 2017</span>
                      <a
                        className="blog_more"
                        href="https://www.vogue.com/article/fall-2022-trends-editor-picks"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h4>Newsletter</h4>
                  <p>
                    Subscribe to our newsletter and get 20% off your first
                    purchase
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <form action="post">
                  <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                    <input
                      id="newsletter_email"
                      type="email"
                      placeholder="Your email"
                      required="required"
                      data-error="Valid email is required."
                    />
                    <button
                      id="newsletter_submit"
                      type="submit"
                      className="newsletter_submit_btn trans_300"
                      value="Submit"
                    >
                      subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className=" footer container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                <ul className="footer_nav">
                  <li>
                    <a href="/#">Blog</a>
                  </li>
                  <li>
                    <a href="/#">FAQs</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                <ul>
                  <li>
                    <a href="/#">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fa fa-skype" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer_nav_container">
                <div className="cr">
                  ©2018 All Rights Reserverd. Made with
                  <i className="fa fa-heart-o" aria-hidden="true" /> by
                  <a href="/#">Colorlib</a> &amp; distributed by
                  <a href="https://themewagon.com">ThemeWagon</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
