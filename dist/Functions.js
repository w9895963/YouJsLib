export function AddToHeadWithoutDup(htmlList) {

    //如果头文件中没有jquery，就添加jquery
    if (typeof jQuery == 'undefined') {
        var script = document.createElement('script');
        script.src = "//unpkg.com/jquery.min.js";
        document.head.appendChild(script);
    }




    //找出网页头的所有scr和href
    var linkList = [];
    $('script').each(function () {
        var src = $(this).attr('src');
        if (src) {
            linkList.push(src);
        }
    });
    $('link').each(function () {
        var href = $(this).attr('href');
        if (href) {
            linkList.push(href);
        }
    });

    htmlList.forEach(element => {
        //获得src或href
        var src = '';
        if (element.indexOf('script') != -1) {
            src = $(element).attr('src');
        } else if (element.indexOf('link') != -1) {
            src = $(element).attr('href');
        }

        //判断是否存在
        if (linkList.indexOf(src) == -1) {
            //插入到head
            $('head').append(element);
        }
    });

}