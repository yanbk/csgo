import router from './router'
import { store } from './store'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async(to, from, next) => {

  document.title = getPageTitle(to.meta.title)

  const hasToken = store.state.user.csgoToken
  if (to.path === '/bag') {
    if (hasToken) {
      next()
    } else {
      store.state.admin.isLogin = true
    }
  } else {
    next()
  }
})

