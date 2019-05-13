const styles = () => ({
  wrapper: {
    /*
      height: 520px;
      width: 320px;
      overflow: hidden;
      background-color: white;
      position: fixed;
      top: 100px;
      left: 50%;
      -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
      box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.5);
      transition: 0.3s ease;
     */
  },

  nav: {
    /*
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      z-index: 100;
      transition: 0.3s ease;
     */
  },

  defaultNav: {
    /*
      height: 64px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 110;
      background-color: #F44336;
      border-bottom: 3px solid #ea1c0d;
      color: #ffffff;
      box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.1);
      transition: 0.3s ease;
     */
  },

  mainNav: {
    /*
      position: absolute;
      left: 0;
      width: 100%;
      height: 64px;
      top: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      transition: 0.3s ease;
     */
  },

  toggle: {
    /*
      height: 32px;
      width: 32px;
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_arrow_back_white_48dp.png);
      background-size: contain;
      margin: 16px;
      float: left;
     */
  },

  mainNavItem: {
    /*
      float: left;
      height: 64px;
      margin-right: 50px;
      position: relative;
      line-height: 64px;
      transition: 0.3s ease;
     */
  },

  mainNavItemLink: {
    /*
      display: block;
      position: relative;
      height: 64px;
      width: 100%;
      text-align: center;
      line-height: 64px;
      text-decoration: none;
      color: inherit;
      transition: 0.3s ease;
     */
  },

  options: {
    /*
      height: 32px;
      width: 32px;
      background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_more_vert_white_48dp.png);
      background-size: contain;
      margin: 16px;
      position: absolute;
      right: 0;
     */
  },

  // content section:

  inner: {
    /*
      overflow: scroll;
      height: 520px;
      padding-top: 64px;
      background: #f2f2f2;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
     */
  },

  content: {
    /*
      padding: 10.6666666667px;
      position: relative;
      margin-bottom: 32px;
     */
  },

  // bottom section

  bottom: {
    /*
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: #ffffff;
     */
  },

  input: {
    /*
      height: 64px;
      background: #ffffff;
      border: none;
      width: calc(100% - 64px);
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 5%;
      resize: none;
      overflow: scroll;
      padding-top: 24px;
      font-weight: 300;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
     */
  },

  send: {
    /*
      position: fixed;
      height: 42.6666666667px;
      width: 42.6666666667px;
      border-radius: 50%;
      border: 0;
      background: #F44336;
      color: #ffffff;
      bottom: 10.6666666667px;
      right: 10.6666666667px;
     */
  }
});

export default styles;