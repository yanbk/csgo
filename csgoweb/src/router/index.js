import vueRouter from 'vue-router'
import vue from 'vue'

vue.use(vueRouter)

//获取原型对象上的push函数
const originalPush = vueRouter.prototype.push
//修改原型对象中的push方法
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/roll',
        name: 'Roll',
        component: () => import('@/views/roll.vue'),
        meta: {
            title: '开箱'
        }
    }
]

const router = new vueRouter({
    routes: routes
})

export default router