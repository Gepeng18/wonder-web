<template>
  <div>
    <div class="top">
      <a class="logo fl"><img src="/assets/images/logo.png"/></a>
      <ul class="navbar clearfifx">
        <li><p @click="$router.replace({path: '/hello'})">首页</p></li>
        <li><p @click="$router.replace({path: '/login'})">登录</p></li>
      </ul>
<!--      <p class="fr"><img src="/assets/images/tel.png"/>0551-88888888</p>-->
    </div>

    <div class="banner">
      <div class="bd">
        <ul>
          <li>
            <a href=""
               style=" background:url(/assets/images/banner4.jpg) center no-repeat; height: 720px; width:100%; display: block;"></a>
          </li>
          <li>
            <a href=""
               style=" background:url(/assets/images/banner3.jpg) center no-repeat; height: 720px; width:100%; display: block;"></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer clearfix">
      <dl>
        <dt>
          简介
        </dt>
        <dd>
          <p>
            <a href="">概况</a>
            <a href="">文化</a>
          </p>
        </dd>
      </dl>
      <dl>
        <dt>
          产品分类
        </dt>
        <dd>
          <p>
            <a href="">xxx系统 </a>
            <a href="">yyy管理 </a>
          </p>
        </dd>
      </dl>
      <dl>
        <dt>
          服务中心
        </dt>
        <dd>
          <p>
            <a href="">其他入口 </a>
            <a href="">加盟XXX </a>

          </p>
        </dd>
      </dl>
      <dl>
        <dt>
          联系方式
        </dt>
        <dd>
          <h3>xxx有限公司</h3>
          <h3 class="pd">工作时间</h3>
          <p>周一至周五 9:00-18:00</p>
          <h3 class="pd">服务热线：400-888-8888</h3>
        </dd>
      </dl>
      <dl>
        <dt>关注我们</dt>
        <dd>
          <img src="/assets/images/code.png"/>
        </dd>
      </dl>
    </div>
    <div class="copyright">
      <p class="fl">xxx有限公司 版权所有 桂ICP备88888888号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="http://web.weihuazhou.top/" target="_blank">wonder</a></p>
      <p class="fr">
        <a href="">法律声明 </a> |
        <a href="">集团概况 </a> |
        <a href="">隐私政策</a> |
        <a href="">服务条款 </a>
      </p>
    </div>
  </div>

</template>

<script>

export default {
  name: "index",
  data() {
    return {}
  },
  mounted() {

    // let script1 = document.createElement('script');
    // script1.type = 'text/javascript';
    // script1.src = '/assets/js/jquery-3.3.1.min.js';
    // document.body.appendChild(script1);
    //
    // let script2 = document.createElement('script');
    // script2.type = 'text/javascript';
    // script2.src = '/assets/js/SuperSlide.2.1.3.js';
    // document.body.appendChild(script2);
    //
    // let script3 = document.createElement('script');
    // script3.type = 'text/javascript';
    // script3.src = '/assets/js/more.js';
    // document.body.appendChild(script3);

  },
  created() {

  },
  methods: {}
}
</script>

<style scoped>
body, html {
  min-width: 1200px;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
}

body, p, h1, h2, h3, h4, h5, table, ul, li, form, input {
  margin: 0;
  padding: 0;
  color: #000;
  font-family: "Microsoft yahei";
}

body, p {
  font-size: 14px;
  border: none;
  color: #000;
}

a {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  border: none;
  padding: 0;
  margin: 0;
}

table {
  border-collapse: collapse;
}

img {
  border: 0;
  margin: 0;
  padding: 0;
}

ul, li {
  list-style: none;
  border: 0;
  margin: 0;
  padding: 0;
}

dl, dt, dd {
  margin: 0;
  padding: 0;
  -webkit-margin-start: 0;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
  font-size: 12px;
  display: block;
}

strong, b {
  font-weight: normal;
}

table, tr, td {
  border-spacing: 0;
}

em, i, b {
  font-style: normal;
}

p {
  line-height: 170%;
  color: #555;
  font-size: 14px;
}

input {
  border: none;
  background: none;
}

figcaption {
  display: block;
}

input:focus {
  outline: none;
}

::-webkit-input-placeholder { /* WebKit browsers */
  font-size: 14px;
  color: #dfdfdf;
}

::-ms-input-placeholder { /* Internet Explorer 10+ */
  font-size: 14px;
  color: #dfdfdf;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix {
  *zoom: 1;
}

.clearfix:before, .clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}

.clearfix:after {
  clear: both;
}

.w1240 {
  width: 1240px;
  margin: 0 auto;
}

.top {
  background: #fff;
  height: 100px;
  padding: 0 45px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
}

.logo {
  display: block;
  margin-top: 15px;
}

.navbar {
  position: absolute;
  top: 0;
  left: 460px;
  width: 100%;
  overflow: hidden;
}

.navbar li {
  float: left;
}

.navbar li p {
  display: block;
  color: #000;
  font-size: 18px;
  padding: 0 35px;
  height: 100px;
  line-height: 100px;
  transition: all 0.7s;
}

.navbar li:hover p {
  color: #EF9C14;
}

.top p {
  font-weight: bold;
  color: #ef9c14;
  font-size: 24px;
  font-family: arial;
  height: 100px;
  line-height: 100px;
}

.top p img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.top.on {
  animation-name: down;
  animation-duration: 1s;
  border-bottom: 1px solid #f5f5f5;
}

.banner {
  position: relative;
  width: 100%;
  height: 720px;
  display: block;
  overflow: hidden;
  margin-top: 100px;
}

.banner .bd {
  position: relative;
}

.banner .bd ul {
  width: 100% !important;
}

.banner .bd li {
  width: 100% !important;
}

.banner .hd {
  position: absolute;
  bottom: 30px;
  text-align: center;
  width: 100%;
  height: 10px;
  z-index: 3333333;
}

.banner .hd li {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  overflow: hidden;
  border: 3px solid #fff;
  margin: 0 10px;
  z-index: 333;
  cursor: pointer;
  transition: all 0.6s;
  font-size: 0;
}

.banner .hd li.on {
  background: #fff;
}


.tit h5 {
  line-height: 0;
}

.tit h5 img {
  display: block;
  margin: 0 auto;
}

.tit h2 {
  color: #000;
  font-size: 60px;
  text-align: center;
  line-height: 0;
}

.tit h2 span {
  color: #ef9c14;
}

.tit p {
  color: #333;
  font-size: 18px;
  letter-spacing: 10px;
  text-align: center;
  margin-top: 40px;
}

.footer {
  background: url(/assets/images/footer-bg.jpg) no-repeat top center;
  padding: 50px 5%;
}

.footer dl {
  float: left;
  width: 18%;
}

.footer dl:nth-child(3) {
  width: 22%;
}

.footer dl:last-child {
  float: right;
}

.footer dl dt {
  color: #fff;
  font-size: 22px;
  padding-bottom: 15px;
}

.footer dl p a {
  display: block;
  color: #aaa;
  font-size: 15px;
  padding: 7px 0;
  transition: all 0.6s;
}

.footer dl h3 {
  color: #fff;
  font-size: 14px;
}

.footer dl .pd {
  padding-top: 20px;
}

.footer dl p {
  color: #aaa;
  font-size: 14px;
}

.footer dl p a:hover {
  color: #EF9C14;
  transform: translateX(5px);
}

.copyright {
  background: #191817;
  height: 75px;
  line-height: 75px;
  padding: 0 5%;
}

.copyright p {
  color: #aaa;
  font-size: 14px;
  line-height: 75px;
}

.copyright p a {
  color: #aaa;
  display: inline-block;
  margin: 0 10px;
}

.copyright p.fr {
  color: #4f4f4f;
}


.breadcrumb .w1240 {
  background: rgba(0, 0, 0, 0.6);
  height: 50px;
  margin-top: -55px;
  position: relative;
  z-index: 333;
}

.breadcrumb span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  text-align: center;
  cursor: pointer;
}

.breadcrumb img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 10px;
}

.breadcrumb p.fl {
  color: #fff;
}

.breadcrumb i {
  font-size: 16px;
  font-family: "宋体";
  margin: 0 0 0 10px;
}

.breadcrumb a.fr {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  margin-right: 10px;
}

.hot-tui .div1 {
  margin-top: 30px;
  border-bottom: 1px solid #F5F5F5;
  margin-bottom: 25px;
}

.hot-tui h2 {
  color: #000;
  font-size: 20px;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  position: relative;
}

.hot-tui h2 b {
  display: block;
  background: #E77817;
  width: 120px;
  height: 2px;
}

.hot-tui a.more {
  color: #EF9C14;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  padding-right: 15px;
}

.news-tui li p {
  float: left;
  width: 33.33%;
}

.news-tui li p a {
  display: block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #333;
  padding: 10px 0;
  text-align: left;
}

.news-tui li p span {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #E77817;
  transform: rotate(45deg);
  margin-right: 10px;
}

.news-tui li {
  overflow: hidden;
  clear: both;
}

.detailspage {
  padding: 50px 0;
}

.displayTitle {
  margin: 0 auto 20px auto;
  border-bottom: 1px solid #F5F5F5;
}

.displayTitle h2 {
  font-size: 23px;
  font-weight: normal;
  color: #333333;
  text-align: center;
}

.dianji_num {
  font-size: 15px;
  color: #666666;
  margin: 23px auto;
  text-align: center;
  height: 33px;
  line-height: 33px;
}

.dianji_num .clearfix {
  text-align: center;
  margin: 0 auto;
  width: 650px;
}

.dianji_num span {
  display: inline-block;
  margin-right: 20px;
}

.displayMain {
  padding: 10px 20px 30px;
  line-height: 36px;
  text-align: center;
  overflow: hidden;
}

.displayMain p {
  font-size: 14px;
  color: #333;
  text-align: left;
  line-height: 36px;
  padding: 15px 0;
}

.displayMain img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}

.share {
  border-top: 1px dotted #cccccc;
  margin-bottom: 20px;
  padding-top: 25px;
}

.share_l {
  width: 560px;
  color: #666666;
}

.share_l li {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
}

.share_l li a {
  color: #333;
  font-size: 14px;
  transition: all 0.6s;
}

.share_l li a:hover {
  color: #EF9C14;
}

.share_r {
  margin-top: 10px;
}

.share_r span a {
  background: #EF9C14;
  width: 155px;
  border-radius: 10px;
  height: 45px;
  color: #fff;
  display: block;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
  transition: all 0.6s;
}

.share_r span a:hover {
  transform: translateX(-10px);
}


@keyframes down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@media screen and (max-width: 1800px) {
  .navbar {
    left: 360px;
  }
}

@media screen and (max-width: 1600px) {
  .top {
    padding: 0 30px;
  }

  .navbar {
    left: 330px;
  }

  .navbar li p {
    padding: 0 30px;
  }
}

@media screen and (max-width: 1500px) {
  .navbar {
    left: 280px;
  }

  .logo img {
    width: 200px;
    margin-top: 10px;
  }

  .navbar li p {
    padding: 0 25px;
    font-size: 16px;
  }
}

</style>
