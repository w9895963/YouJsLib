export
    function AddToHeadWithoutDup(htmlList, onload) {
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


    var tolNum = 0;
    var currNum = 0;
    htmlList.forEach(element => {
        //获得src或href
        var link = '';
        var dom;


        if (element.indexOf('script') != -1) {
            link = $(element).attr('src');
            //如果link已经存在，就不再加载
            if (linkList.indexOf(link) != -1) {
                return;
            }
            tolNum++;
            console.log(link);
            dom = document.createElement('script');
            dom.src = link;
            dom.type = 'text/javascript';

        } else if (element.indexOf('link') != -1) {
            link = $(element).attr('href');
            //如果link已经存在，就不再加载
            if (linkList.indexOf(link) != -1) {
                return;
            }
            tolNum++;
            dom = document.createElement('link');
            dom.href = link;
            dom.rel = 'stylesheet';

        }

        dom.onload = function () {
            currNum++;

            if (currNum == tolNum) {
                onload();
            }
        }
        //插入到head
        document.head.appendChild(dom);


    });

}