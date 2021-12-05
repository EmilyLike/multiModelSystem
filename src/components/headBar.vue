<template>
<div class="header">
    <el-container>
        <el-header class="header">
          <div class="system-title">
            <span>
              <font-awesome-icon icon="camera" />
            </span>
            <span> 多模态数据采集系统</span>
          </div>
          <div class="system-user">
            <span class="user-icon">
              <font-awesome-icon icon="user" />
            </span>
            <span>用户名</span>
          </div>
        </el-header>
    </el-container>
</div>

</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Options(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Layout extends Vue {

}
</script>

<style lang="scss">
.header {
  padding:0;
  background: #001629;
  display: flex;
  .system-title {
    box-sizing: border-box;
    height: 50px;
    padding: 0 10px 0 20px;
    width: 200px;
    background-color: #002240;
  }
  .system-user {
    .user-icon {
      padding-right: 10px;
    }
    flex:1;
    padding-right: 20px;
    text-align: right;
  }
  line-height: 50px;
  height: 50px;
  width: 100%;
  color: #fff;
}
</style>
