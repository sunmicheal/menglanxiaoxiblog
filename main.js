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


setInterval(changeImage, 5000); // 每5秒调用一次changeImage函数

