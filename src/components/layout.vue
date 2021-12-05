<template>
<div class="left-nav">
    <head-bar></head-bar>
    <el-container>
      <side-bar></side-bar>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
</div>

</template>

<script>
import { Options, Vue } from 'vue-class-component';
import SideBar from './sideBar.vue';
import HeadBar from './headBar.vue';

@Options({
  components:
  {
    SideBar,
    HeadBar,
  },
})
export default class Layout extends Vue {

}
</script>

<style lang="scss">
.left-nav {
  height: 100%;
  overflow: hidden;
  .el-container,
  .el-aside {
    height: 100%;
  }
  .main {
    height: 100%;
    padding: 0px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
