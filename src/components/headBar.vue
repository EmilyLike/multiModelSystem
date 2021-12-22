<template>
<div class="header-bar">
    <el-container>
        <el-header class="header">
          <div class="system-title">
            <!-- <span class="system-icon"> -->
              <el-icon style="font-size:30px;"><help-filled /></el-icon>
            <!-- </span> -->
            <span>
              多模态数据采集系统
            </span>
          </div>
          <div class="system-bread">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in breadlist"
              :key="index">
                {{item}}
              </el-breadcrumb-item>

            </el-breadcrumb>

          </div>
          <div class="system-user">
            <span class="user-icon">
              <font-awesome-icon icon="user" />
            </span>
            <span class="user-number">{{phoneNumber}}</span>
          </div>
        </el-header>
    </el-container>
</div>

</template>

<script>
import { Options, Vue } from 'vue-class-component';
// import { Watch } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

@Options(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Layout extends Vue {
  route=useRoute();

  store = useStore();

  get phoneNumber() {
    return this.store.getters.userInfo;
  }

  /** 面包屑路径 */
  get breadlist() {
    const result = [];
    for (let i = 1; i < this.route.matched.length;) {
      if (this.route.matched[i].meta.title) result.push(this.route.matched[i].meta.title);
      i += 1;
    }
    // console.log('this is route matched', this.route.matched);
    return result;
  }
}
</script>

<style lang="scss">
.header {
  padding:0;
  background: #001629;
  display: flex;
  align-items: center;
  .system-title {
    color: #c6ccd3;
    font-size: 14px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    padding: 0 10px 0 10px;
    width: 200px;
    background-color: #002240;
  }
  .system-bread {
    font-size: 12px;
    color: #6b7075;
    margin-left: 20px;
  }
  .system-user {
    .user-icon {
      padding-right: 10px;
    }
    flex:1;
    padding-right: 20px;
    text-align: right;
    .user-number {
      font-size: 14px;
    }
  }
  line-height: 50px;
  height: 50px;
  width: 100%;
  color: #fff;
}
</style>
