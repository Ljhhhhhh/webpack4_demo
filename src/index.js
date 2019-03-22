let str = require('./a.js')
import './index.css';
import './index.scss';

document.getElementById('app').innerHTML = str;

if (module.hot) {
  module.hot.accept();
  // module.hot.accept('./a.js', function() {
  //   let str = require('./a.js');
  //   document.getElementById('app').innerHTML = str;
  // })
}