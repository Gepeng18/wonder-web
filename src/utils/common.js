import Vue from "vue";
import CommonDialog from "@/components/CommonDialog.vue";

export function resetForm(refName) {
    //this.$nextTick(() => {
    if (this.$refs[refName]) {
        this.$refs[refName].resetFields();
    }
    //})
}

export function dialog(options) {
    return new Promise((resolve, reject) => {
        const dialogInstance = new Vue({
            render: h => h(CommonDialog, {
                props: {
                    ...options,
                    display: true,
                    resolve,
                    reject
                },
                on: {
                    confirm() {
                        resolve(dialogInstance);
                        // 怎么在这捕获请求的的异常,如果是请求异常,则调用stopLoading()方法, 且不继续销毁实例.
                        setTimeout(() => {
                            dialogInstance.$destroy();
                            dialogInstance.$el.parentNode.removeChild(dialogInstance.$el);
                        }, 500)

                    },
                    cancel() {
                        reject();
                        dialogInstance.$destroy();
                        dialogInstance.$el.parentNode.removeChild(dialogInstance.$el);
                    }
                }
            })
        }).$mount();

        document.body.appendChild(dialogInstance.$el);
    });
}

// 添加日期范围
export function addDateRange(params, dateRange) {
    params = typeof (params) === 'object' && params !== null ? params : {};
    dateRange = Array.isArray(dateRange) ? dateRange : [];
    params['beginDate'] = dateRange[0];
    params['endDate'] = dateRange[1];
    return params;
}
