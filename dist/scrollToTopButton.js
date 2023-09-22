




$(function () {

    // 创建一个新的div元素，作为滚动到顶部的按钮
    var topButton = document.createElement("div");
    topButton.innerHTML = "⬆️";
    topButton.style.position = "fixed";
    topButton.style.bottom = "20px";
    topButton.style.left = "20px";
    topButton.style.cursor = "pointer";
    topButton.style.padding = "10px";
    topButton.style.backgroundColor = "#ddd";

    //将这个按钮变成圆形
    topButton.style.borderRadius = "50%";






    document.body.appendChild(topButton);

    // 当点击这个按钮时，滚动到页面顶部
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
        
});