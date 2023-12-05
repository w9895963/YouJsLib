/**========================================================================
 **                         * *快捷工具栏-产品页面* *
 *?  过滤框
 *?  
 *========================================================================**/



export default async function loadPlugin({ 定位插入表格, 预设配置 } = {}) {


    await new Promise((resolve) => {
        const dom = document.createElement('script');
        dom.src = 'https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.min.js';
        dom.onload = resolve;
        document.head.appendChild(dom);
    });
    await Promise.all([
        "https://cdn.staticfile.org/dayjs/1.11.10/dayjs.min.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/customParseFormat.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/weekday.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/localeData.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/weekOfYear.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/weekYear.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/advancedFormat.js",
        "https://cdn.staticfile.org/dayjs/1.11.10/plugin/quarterOfYear.js"]
        .map((url) => new Promise((resolve) => {
            const dom = document.createElement('script');
            dom.src = url;
            dom.onload = resolve;
            document.head.appendChild(dom);
        })))


    await new Promise((resolve) => {
        const dom = document.createElement('script');
        dom.src = 'https://cdn.staticfile.org/ant-design-vue/4.0.7/antd-with-locales.min.js';
        dom.onload = resolve;
        document.head.appendChild(dom);
    });


    const { createApp, ref, reactive, computed, watch } = Vue;
    const { zh_CN } = antd.locales;


    const appDom = document.createElement('div');
    appDom.id = 'app_toolBar';
    appDom.style.padding = '4px 12px';
    appDom.style.border = '1px solid rgb(219 219 219)';
    appDom.style.borderBottomWidth = 0;
    appDom.style.backgroundColor = 'rgb(248 248 248)';


    document.querySelector(定位插入表格).before(appDom);


    createApp({
        components: {
            zh_CN
        },
        template: /* html */`
        <a-provider locale="zh_CN" :wave='false' :theme="{  }">
        <div :style="{   }">

        <a-space align="center" :style="{  }">
            <a-typography-title :level="5" :style="{marginBottom:0  }">过滤</a-typography-title>
            <a-auto-complete
                v-model:value="输入值"
                allowClear
                :options="过滤输入框选项"
                :style="{width:配置.输入框宽度+'px'}"
            />

            <a-typography-title :level="5" :style="{marginBottom:0  }">跳转</a-typography-title>
            <a-switch
                v-model:checked="配置.跳转值"
                :checked-value="true"
                :un-checked-value="false"
                checked-children="开"
                un-checked-children="关"
            />

            <a-popover placement="bottom" title="配置" trigger="click">
                <template #content>
                    <a-flex :gap="12" align="center" :style="{ }">
                        <div :style="{flex:'0 0 auto'}">跳转目标</div>
                        <a-select v-model:value="配置.跳转链接索引" :options="配置ui跳转选项列表" :style="{flex:'1 0 auto'}" />
                    </a-flex>
                    <a-flex :gap="12" align="center">
                        <div :style="{flex:'0 0 auto'}">索引目标</div>
                        <a-select
                            v-model:value="配置.索引列"
                            :options="配置ui索引列选项"
                            mode="multiple"
                            :style="{flex:'1 0 auto'}"
                        />
                    </a-flex>
                    <a-flex :gap="12" align="center">
                        <div :style="{flex:'0 0 auto'}">输入框宽度</div>
                        <a-input v-model:value="配置.输入框宽度" :style="{flex:'1 1 auto'}" />
                    </a-flex>
                    <a-button @click="重置配置">重置配置</a-button>
                    <div :style="{flex:'0 0 auto'}">导出预设配置字符串</div>
                    <a-textarea v-model:value="预设配置字符串" autosize :rows="2" />
                </template>
                <a-button
                    :style="{width:'36px',height:'36px',display:'flex',justifyContent: 'center', backgroundColor: '#faebd700',border: 0 ,  flexWrap: 'wrap',   alignContent: 'center', }"
                >
                    <template #icon>
                        <svg
                            height="24px"
                            :style="{flex:auto  }"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            data-v-ea893728=""
                        >
                            <path
                                fill="currentColor"
                                d="M224 160a64 64 0 0 0-64 64v576a64 64 0 0 0 64 64h576a64 64 0 0 0 64-64V224a64 64 0 0 0-64-64zm0-64h576a128 128 0 0 1 128 128v576a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V224A128 128 0 0 1 224 96"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M384 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M480 320h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32m160 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256"
                            ></path>
                            <path fill="currentColor" d="M288 640h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32"></path>
                        </svg>
                    </template>
                </a-button>
            </a-popover>
        </a-space>
        </div>
        </a-provider>
    `,
        setup() {
            //*共享数据
            const 输入值 = ref('');
            const 过滤输入框选项 = ref([]);
            const 配置 = reactive({
                跳转值: true,
                跳转链接索引: 4,
                索引列: [4],
                输入框宽度: 200
            });
            const 配置ui跳转选项列表 = ref([{}]);
            const 配置ui索引列选项 = ref([]);
            const 预设配置字符串 = ref('');


            //*构建 跳转链接引选项 
            const 跳转链接标题集合 = Array.from(document.querySelectorAll('.result-wrap tr')[1].children).flatMap((x, i) => {
                const 列索引 = i;
                const allA = x.querySelectorAll('a');
                return Array.from(allA).map((x, i) => ({
                    label: `${document.querySelectorAll('.result-wrap tr')[0].children[列索引].textContent} - ${x.textContent}`,
                }))
            });
            配置ui跳转选项列表.value = 跳转链接标题集合.map((x, i) => ({
                label: x.label,
                value: i
            }));

            //*构建 索引列选项
            配置ui索引列选项.value = Array.from(document.querySelectorAll('.result-wrap tr')[0].children).map((x, i) => {
                return {
                    value: i,
                    label: x.textContent
                }
            });

            //*构建 列表数据
            var 列表数据集 = [];
            const trs = document.querySelectorAll('.result-wrap tr');
            const trArr = Array.from(trs).filter((tr, i) => i > 0);
            列表数据集 = trArr.map((tr) => ({
                value: Array.from(tr.children)
                    .filter((x, i) => 配置.索引列.includes(i))
                    .map(x => Array.from(x.childNodes)
                        .filter((item) => item.nodeType == Node.TEXT_NODE)
                        .map((item) => item.textContent).join(' ')
                    ).join(' '),
                dom: tr,
                jumpHref: tr.querySelectorAll('a')[配置.跳转链接索引].href
            }));


            function 构建过滤输入框选项() {
                //*构建 过滤器选项
                过滤输入框选项.value = 列表数据集.map((x) => ({
                    value: Array.from(x.dom.children)
                        .filter((x, i) => 配置.索引列.includes(i))
                        .map(x => Array.from(x.childNodes)
                            .filter((item) => item.nodeType == Node.TEXT_NODE)
                            .map((item) => item.textContent).join(' ')
                        ).join(' '),
                }));
            }





            //*当搜索输入的时候
            watch(输入值, (val) => {
                const 搜索命中的行 = 列表数据集.filter((x) => x.value.toUpperCase().includes(val.trim().toUpperCase()));
                列表数据集.forEach((x) => {
                    x.dom.style.display = 'none';
                })
                搜索命中的行.forEach((x) => {
                    x.dom.style.display = null;
                })

                //*自动跳转
                if (配置.跳转值 && 搜索命中的行.length == 1) {
                    //打开新窗口
                    window.open(搜索命中的行[0].dom.querySelectorAll('a')[配置.跳转链接索引].href);
                }

            })

            //*配置存取
            watch(配置, (val) => {
                // console.log(val)
                构建过滤输入框选项();
                预设配置字符串.value = JSON.stringify(val);
                localStorage.setItem('表格过滤器-配置', JSON.stringify(val));
            })
            const 读取配置 = JSON.parse(localStorage.getItem('表格过滤器-配置')) ?? {};
            for (const key in 配置) {
                配置[key] = 读取配置[key] ?? 预设配置[key] ?? 配置[key]
            }

            // #按钮功能
            //*重置配置
            function 重置配置() {
                for (const key in 配置) {
                    配置[key] = 预设配置[key] ?? 配置[key];
                }
            }

            return {
                输入值,
                过滤输入框选项,
                配置,
                配置ui跳转选项列表,
                配置ui索引列选项,
                预设配置字符串,
                重置配置
            }
        }
    })
        .use(antd)
        .mount('#app_toolBar');



}