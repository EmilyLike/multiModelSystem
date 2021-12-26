import { Component, Vue } from 'vue-property-decorator';
// import { Watch } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './style/headBar.scss';

@Component(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Layout extends Vue {
  render() {
    return (<div class="header-bar">
    <el-container>
        <el-header class="header">
          <div class="system-title">
            <i class="el-icon-s-help" style="font-size:30px;"></i>
            <span>
              多模态数据采集系统
            </span>
          </div>
          <div class="system-bread">
            <el-breadcrumb separator="/">
              {
                this.breadlist.map((item: any, index: any) => (
                    <el-breadcrumb-item key={index}>
                    {item}
                  </el-breadcrumb-item>
                ))
              }
            </el-breadcrumb>

          </div>
          <div class="system-user">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
              <i class="el-icon-user user-icon"></i>{this.phoneNumber}
              </span>
              <el-dropdown-menu>
                <el-dropdown-item nativeOnClick={this.handleCommand}>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
    </el-container>
</div>

    );
  }

  get phoneNumber() {
    return sessionStorage.getItem('userInfo')?.replaceAll('"','');
  }

  /** 面包屑路径 */
  get breadlist() {
    const result = [];
    const {menuName} = this.$store.getters;
    const menuList = menuName.split('/');
    return menuList;
  }

  handleCommand() {
    console.log('this is commang');
    sessionStorage.removeItem('userInfo');
    this.$router.push({
      name:'Login'
    })
  }
}
