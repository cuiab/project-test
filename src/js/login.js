import '../css/reset.css';
import '../less/login.less';
// require('../less/login.less');


// import $ from 'jquery';
// import Swiper from 'swiper';
// import 导出对象 from '相对地址，若是引入node_modules里的就直接写名字';

// require('js-base64');

// require('./shopcar');

var name = 'login2222222222';

import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';

var ss = new Swiper('.swiper-container', {
  direction: 'horizontal',
  autoplay: {
    delay: 3000,
  }
})

console.log(ss);

import $ from 'jquery';

console.log( $('div') );

// 使用引入的模块
// $('#xx')
// new Swiper('', {

// })
