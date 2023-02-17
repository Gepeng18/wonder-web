// export function menuHandle(menuList) {
//     let permits = []
//     let routes = []
//     let menus = []
//
//     menuList.forEach(item => {
//         if (item.permission && item.permission !== '') {
//             permits.push(item.permission)
//         }
//
//         if (item.menuType === 2) {
//             routes.push({
//                 path: item.path,
//                 meta: {
//                     auth: !!item.permission,
//                     title: item.title
//                 },
//                 component: resolve => require([`@/views/${item.component}`], resolve)
//             })
//         }
//
//
//
//     })
// }

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data) {
    let permits = []
    let routes = []
    let menus = []

    for (let item of data) {
        if (item.permission && item.permission !== '') {
            permits.push(item.permission)
        }
        if (item.menuType === 2) {
            routes.push({
                path: item.path,
                auth: !!item.permission,
                title: item.name,
                component: item.component
            })
        }
    }
    const obj = {};
    data.forEach((item) => {
        obj[item.id] = item;
    });

    data.forEach((item) => {
        const parent = obj[item.parentId];
        if (parent) {
            // * 当前项有父节点
            parent.children = parent.children || [];
            parent.children.push(item);
        } else {
            // * 当前项没有父节点 -> 顶层
            menus.push(item);
        }
    });

    return {
        permits,
        routes,
        menus
    }

}
