import store from "@/store";

const has = {
    // eslint-disable-next-line no-unused-vars
    install (Vue, options) {
        Vue.directive('has', {
            inserted: (el, binding, vnode)=>{
                filterGlobalPermission(el, binding, vnode);
            }
        });
    }
};
/**
 * 全局权限控制
 */
// eslint-disable-next-line no-unused-vars
export const filterGlobalPermission = (el, binding, vnode) => {
    let permissions = store.state.userPerMits;
    if (permissions && !permissions.includes(binding.value)) {
        el.parentNode.removeChild(el);
    }
}
export default has;
