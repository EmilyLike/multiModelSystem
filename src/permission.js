import router from './router/index';
import store from './store/index';

router.beforeEach((to, from, next) => {
  console.log('this is router', router);
  const { userInfo } = store.getters;
  if (Object.keys(userInfo).length) {
    if (to.name === 'Login') {
      next({
        name: 'record',
      });
    }
    next();
  }
});
