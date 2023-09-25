





export async function AddToHeadIfNotExist(htmlList) {

    //*初始化全局变量
    if (typeof window.data_AddToHeadIfNotExist == 'undefined') {
        window.data_AddToHeadIfNotExist = {
            正在加载的脚本: [],
        };
    }
    var data_AddToHeadIfNotExist = window.data_AddToHeadIfNotExist;

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

    //*需要新建的链接
    var linkToBeCreated = [];
    linkToBeCreated = htmlList.filter(it => !linkList.includes(it));
    //已经存在的链接
    var linkAlreadyExist = htmlList.filter(it => linkList.includes(it));




    //*将要新建的dom
    var domListToWrite = [];
    linkToBeCreated.forEach(link => {
        if (link.endsWith('.js')) {
            var dom = document.createElement('script');
            dom.src = link;
            dom.type = 'text/javascript';
            domListToWrite.push({
                dom: dom,
                link: link,
            });
        } else if (link.endsWith('.css')) {
            var dom = document.createElement('link');
            dom.href = link;
            dom.rel = 'stylesheet';
            domListToWrite.push({
                dom: dom,
                link: link,
            });
        }
    });

    //*正在加载的dom
    var domListLoading = data_AddToHeadIfNotExist.正在加载的脚本.filter(it => linkAlreadyExist.includes(it.link));


    //*新建dom
    document.head.append(...domListToWrite.map(it => it.dom));


    //*在全局数据中添加正在加载的脚本
    data_AddToHeadIfNotExist.正在加载的脚本.push(...domListToWrite);
    //载入完成后，移除对应数据
    domListToWrite.forEach(domData => {
        domData.dom.addEventListener('load', () => {
            //移除
            data_AddToHeadIfNotExist.正在加载的脚本.splice(data_AddToHeadIfNotExist.正在加载的脚本.indexOf(domData), 1);
        });
    });



    //*等待加载完毕
    var domsToWaitForLoading = [...domListToWrite, ...domListLoading];
    async function waitLoad(domList) {
        let promises = domList.map(domData => new Promise((resolve) => domData.dom.addEventListener('load', resolve)));
        await Promise.all(promises);
    }
    await waitLoad(domsToWaitForLoading);



}




