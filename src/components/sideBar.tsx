import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './style/sideBar.scss';

@Component(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Layout extends Vue {
  render() {
    return (
      <div class="aside">
  <el-container>
    <el-aside class="aside">
        <el-menu
        text-color="#c6ccd3"
        active-text-color="#1990ff"
        default-active="record"
        router
        >
            <el-menu-item index="/record" onClick={this.storeRoot} scopedSlots={{
              title: (prop: any) => (
                <span>
                  <i class="el-icon-camera"></i>
                <span>数据采集</span>
                </span>

              ),
            }}>
            </el-menu-item>
            <el-menu-item index="/data" onClick={this.storeRoot} scopedSlots={{
              title: (prop: any) => (
                <span>
                  <i class="el-icon-coin"></i>
                <span>所有数据</span>
                </span>

              ),
            }}>
            </el-menu-item>
            <el-menu-item index="/settings" onClick={this.storeRoot} scopedSlots={{
              title: (prop: any) => (
                <span>
                  <i class="el-icon-setting"></i>
                  <span>个人设置</span>
                </span>

              ),
            }}>
            </el-menu-item>
        </el-menu>
    </el-aside>
  </el-container>
</div>
    );
  }

  item = null;

  storeRoot(item:any):void {
    this.item = item;
    const ma:Record<string, string> = {
      '/record': '数据采集',
      '/data':'所有数据',
      '/settings':'个人设置'
    }

    this.$store.commit('changemenuName', ma[item.index as string]);
  }
}
