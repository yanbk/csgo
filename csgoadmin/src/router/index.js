import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/user/ldap_user_edit_pwd',
    component: () => import('@/views/editpass/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true,
          roles: ['admin', 'get_bill_project_trend']
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'folder',
      roles: [
        'admin', 'add_user', 'user_info', 'edit_user', 'del_user', 'user_list',
        'groups_add', 'groups_info', 'groups_edit', 'groups_list', 'groups_del',
        'ldap_setting_info', 'ldap_setting_edit', 'ldap_test_conn', 'ldap_test_login', 'ldap_import_user',
        'ldap_add_user_to_safe_group', 'ldap_remove_user_to_safe_group', 'ldap_group_add', 'ldap_user_add', 'ldap_user_info', 'ldap_user_edit_status_to_die', 'ldap_user_edit_status_to_activ', 'ldap_user_edit_info', 'ldap_group', 'ldap_change_user_group'
      ]
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/user'),
        name: 'User',
        meta: {
          title: '用户列表',
          icon: 'table',
          roles: ['admin', 'add_user', 'user_info', 'edit_user', 'del_user', 'user_list']
        }
      },
      {
        path: 'group',
        component: () => import('@/views/user/group'),
        name: 'Group',
        meta: {
          title: '用户组',
          icon: 'table',
          roles: ['admin', 'groups_add', 'groups_info', 'groups_edit', 'groups_list', 'groups_del']
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'folder',
      roles: [
        'admin', 'add_modules', 'modules_info', 'edit_modules', 'list_modules',
        'add_permission', 'permission_info', 'edit_permission', 'del_permission', 'list_permission', 'dict_list_permission', 'del_modules'
      ]
    },
    children: [
      // {
      //   path: '/module',
      //   component: mainLayout,
      //   redirect: '/module/index',
      //   meta: {
      //     roles: ['admin', 'add_modules', 'modules_info', 'edit_modules', 'list_modules']
      //   },
      //   children: [
      //     {
      //       path: 'index',
      //       component: () => import('@/views/module/index'),
      //       name: 'Module',
      //       meta: { title: '模块管理', icon: 'module', noCache: true }
      //     }
      //   ]
      // },
      // {
      //   path: 'menu',
      //   component: () => import('@/views/system/menu'),
      //   name: 'Menu',
      //   meta: {
      //     title: '菜单管理',
      //     icon: 'table',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'index',
        component: () => import('@/views/system/index'),
        name: 'Module',
        meta: { title: '系统管理', icon: 'table', noCache: true }
      }
    ]
  },
  {
    path: '/openCase',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '开箱配置',
      icon: 'folder',
      roles: ['admin']
    },
    children: [
      {
        path: 'caseCategory',
        name: 'CaseCategory',
        component: () => import('@/views/openCase/caseCategory.vue'),
        meta: {
          title: '箱子分类',
          icon: 'list',
          roles: ['admin']
        }
      },
      {
        path: 'caseConfig',
        name: 'CaseConfig',
        component: () => import('@/views/openCase/caseConfig.vue'),
        meta: {
          title: '箱子配置',
          icon: 'list',
          roles: ['admin']
        }
      },
      {
        path: 'paramConfig',
        name: 'ParamConfig',
        component: () => import('@/views/openCase/paramConfig.vue'),
        meta: {
          title: '控制参数配置',
          icon: 'list',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/otherConfig',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '其他配置',
      icon: 'folder',
      roles: ['admin']
    },
    children: [
      {
        path: 'roll',
        name: 'Roll',
        component: () => import('@/views/otherConfig/roll.vue'),
        meta: {
          title: 'roll房管理',
          icon: 'list',
          roles: ['admin']
        }
      },
      {
        path: 'promote',
        name: 'Promote',
        component: () => import('@/views/otherConfig/promote.vue'),
        meta: {
          title: '推广返利',
          icon: 'list',
          roles: ['admin']
        }
      },
      {
        path: 'adminSet',
        name: 'AdminSet',
        component: () => import('@/views/openCase/paramConfig.vue'),
        meta: {
          title: '管理员设置',
          icon: 'list',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
