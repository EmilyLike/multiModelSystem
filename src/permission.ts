import router from './router/index';
// import store from './store/index';

router.beforeEach((to, from, next) => {
  // console.log('this is router', to, from);

    // 1.如果访问的是登录页面（无需权限），直接放行
    if (to.path === '/login') return next()
    // 2.如果访问的是有登录权限的页面，先要获取token
    const tokenStr = window.sessionStorage.getItem('userInfo')
    // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
    if (!tokenStr) return next('/login')
    next()
});
