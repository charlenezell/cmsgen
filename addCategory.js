/* <select name="categoryType" id="categoryType">
    <option value="0">显示类别</option>
    <option value="1">内容类别</option>
    <option value="2">系统类别</option>
    <option value="4">占位类别</option>
</select> */
(function () {
    // var isTest = false;
        var isTest = true;

    var commonInfo = {
        categoryContent: "",
        webSite: "http://www.172tt.com",
        storeSite: "/home/site/web/tianti",
        directory: "/ttttttttttt/"
    }

    var cat = [{
        n: "wwws测试官网",
        p: 0,
        t: 4,
        c: [{
            n: "所有文章",
            t: 4,
            c: ["栏目1", "栏目2"]
        }, {
            n: "多选类别1",
            t: 2,
            c: [{
                n: "多选",
                c: [1, 2, 3, 4, 5, 6, 7].map(v => {
                    return {
                        t: 0,
                        n: `类别${v}`
                    }
                }
                )
            }, '默认文章']
        }, "通用数据"]
    }];

    function c(info) {
        return new Promise((resolve) => {
            let u = new URL('http://cmsservice.100bt.com/addCategory.action')
            let arg = Object.assign({}, commonInfo, {
                parentCategoryId: info.p,
                categoryAliasName: info.path,
                categoryName: info.n,
                categoryType: info.t
            });
            Object.keys(arg).forEach(v => {
                u.searchParams.append(v, arg[v]);
            }
            )
            console.log(JSON.stringify(arg, null, ''))
            if (isTest) {
                resolve("tttttttttttttttttttt")
            } else {
                fetch(u.toString(), {
                    credentials: 'include'
                }).then(v => v.json()).then(v => {
                    resolve(v.categoryId)
                }
                );
            }

        }
        )

    }
    function isString(w) {
        return typeof w === "string";
    }
    function createCat(catArr, cid, parentInfo) {

        catArr.forEach(v => {
            let catbaseInfo = v;
            if (isString(v)) {
                catbaseInfo = {
                    n: v,
                    t: 1//默认值
                }
            }
            if (catbaseInfo.t === undefined) {
                catbaseInfo.t = 1;
            }
            let path = v.n;
            if (parentInfo) {
                path = parentInfo.path + "_" + (isString(v) ? v : v.n)
            }
            let curInfo = Object.assign(catbaseInfo, {
                p: v.p !== undefined ? v.p : cid,
                path: path,
            });
            c(curInfo).then(cid => {
                if (v.c) {
                    createCat(v.c, cid, curInfo)
                }
            }
            );

        }
        )
    }

    function main() {
        createCat(cat);
    }

    main()
}
)();
