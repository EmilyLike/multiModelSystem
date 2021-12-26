import { Component, Vue } from 'vue-property-decorator';
import './style/layout.scss';
import SideBar from './sideBar';
import HeadBar from './headBar';

@Component({
  components:
  {
    SideBar,
    HeadBar,
  },
})
export default class Layout extends Vue {
  render() {
    return (<div class="left-nav">
    <head-bar></head-bar>
    <el-container>
      <side-bar></side-bar>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
</div>);
  }
}
