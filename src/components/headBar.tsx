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
                this.breadlist.map((item, index) => (
                    <el-breadcrumb-item key={index}>
                    {item}
                  </el-breadcrumb-item>
                ))
              }
            </el-breadcrumb>

          </div>
          <div class="system-user">
            <span class="user-icon">
              <i class="el-icon-user"></i>
            </span>
            <span class="user-number">{this.phoneNumber}</span>
          </div>
        </el-header>
    </el-container>
</div>

    );
  }

  get phoneNumber() {
    return sessionStorage.getItem('userInfo')?.replaceAll('"','');
    // return this.$store.getters.userInfo;
  }

  /** 面包屑路径 */
  get breadlist() {
    const result = [];
    const {menuName} = this.$store.getters;
    const menuList = menuName.split('/');
    // for (let i = 1; i < this.$route.matched.length;) {
    //   if (this.$route.matched[i].meta.title) result.push(this.$route.matched[i].meta.title);
    //   i += 1;
    // }
    // console.log('this is route matched', this.route.matched);
    return menuList;
  }
}
