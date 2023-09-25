





export function AddToHeadIfNotExist(htmlList, onload) {
    //*获得网页头的所有scr和href
    var linkList = [];
    document.querySelectorAll('script').forEach(function (element) {
        var src = element.getAttribute('src');
        if (src) {
            linkList.push(src);
        }
    });
    document.querySelectorAll('link').forEach(function (element) {
        var href = element.getAttribute('href');
        if (href) {
            linkList.push(href);
        }
    });

    //*获得所有不重复的链接
    var uniqueLinkList = [];
    uniqueLinkList = htmlList.filter(it => !linkList.includes(it));

    //*生成对应的dom
    var domList = [];
    uniqueLinkList.forEach(link => {
        if (link.endsWith('.js')) {
            var dom = document.createElement('script');
            dom.src = link;
            dom.type = 'text/javascript';
            domList.push(dom);
        } else if (link.endsWith('.css')) {
            var dom = document.createElement('link');
            dom.href = link;
            dom.rel = 'stylesheet';
            domList.push(dom);
        }
    });


    //*加载dom
    document.head.append(...domList);

    //*等待加载完毕
    async function waitLoad(domList) {
        let promises = domList.map(dom => new Promise((resolve) => dom.onload = resolve));
        await Promise.all(promises);
    }
    waitLoad(domList).then(onload);


}