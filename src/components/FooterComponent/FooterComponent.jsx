import React from "react";
import "../../assets/scss/footer.scss";
import pay1 from "../../assets/img/pay_img/jcb.png";
import logo_white from '../../assets/img/shop_logo_white.png'
import pay2 from "../../assets/img/pay_img/mastercard.png";
import pay3 from "../../assets/img/pay_img/paypal.png";
import pay4 from "../../assets/img/pay_img/visa.png";

const FooterComponent = () => {
  return (
    <div className="footer">
      <div className="contact-col footer-col">
        <div className="footer-row">
          <img src={logo_white} alt="" className="contact-logo-img" />
        </div>
        <div className="contact-title footer-row">© 2023 WatchHouse.com</div>
        <div className="footer-title">Payment Methods</div>
        <div className="contact-pay footer-row">
          <img src={pay1} alt="pay1" className="pay-img" />
          <img src={pay2} alt="pay2" className="pay-img" />
          <img src={pay3} alt="pay3" className="pay-img" />
          <img src={pay4} alt="pay4" className="pay-img" />
        </div>
      </div>
      {/* Locate us */}
      <div className="locate-col footer-col">
        <div className="footer-title">Locate us</div>
        <div className="footer-row">
          <i className="locate-icon fa-sharp fa-solid fa-location-dot"></i>
          HaDong, Hanoi, Vietnam
        </div>
        <div className="footer-row">
          <i className="locate-icon fa-solid fa-phone"></i>
          Hotline: 0333.668.888
        </div>
        <div className="footer-row">
          <i className="locate-icon fa-solid fa-envelope"></i>
          Email: watchhouse@gmail.com
        </div>
      </div>
      {/* Profile */}
      <div className="profile-col footer-col">
        <div className="footer-title">Profile</div>
        <div className="footer-row">
          <i className="locate-icon fa-solid fa-user"></i>
          My account
        </div>
        <div className="footer-row">
          <i className="locate-icon fa-regular fa-credit-card"></i>
          Checkout
        </div>
        <div className="footer-row">
          <i className="locate-icon fa-solid fa-house"></i>
          Order tracking
        </div>
        <div className="footer-row">
          <i className="locate-icon fa-sharp fa-solid fa-headset"></i>
          Help and support
        </div>
      </div>
      {/* Follow Us */}
      <div className="follow-col footer-col">
        <div className="footer-title">Follow us</div>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer-row">
          <i className="social-icon fa-brands fa-facebook"></i>
          Facebook
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="footer-row">
          <i className="social-icon fa-brands fa-youtube"></i>
          Youtube
        </a>
        <a href="https://twitter.com/home" target="_blank" rel="noreferrer" className="footer-row">
          <i className="social-icon fa-brands fa-twitter"></i>
          Twiter
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="footer-row">
          <i className="social-icon fa-brands fa-instagram"></i>
          Instagram
        </a>
      </div>
    </div>
  );
};

export default FooterComponent;
