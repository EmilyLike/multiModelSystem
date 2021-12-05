<template>
<div class="aside">
  <el-container>
    <el-aside class="aside">
        <el-menu
        background-color="#1D8ce0"
        text-color = "#fff"
        active-text-color="#f391a9"
        router
        >
            <el-menu-item index="record">
                <template #title>
                <font-awesome-icon class="record-icon" icon="file-video" />
                <span>数据采集</span>
                </template>
            </el-menu-item>
            <el-menu-item index="data">
                <template #title>
                <font-awesome-icon class="data-icon" icon="database" />
                <span>所有数据</span>
                </template>
            </el-menu-item>
            <el-menu-item index="settings">
                <template #title>
                <font-awesome-icon class="setting-icon" icon="cog" />
                <span>个人设置</span>
                </template>
            </el-menu-item>
        </el-menu>
    </el-aside>
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
.aside {
  height: 100%;
  width: 200px !important;
  flex: none;
  background-color: #001629;
  border-right: solid 1px #e6e6e6;
    .record-icon {
      padding-right: 10px;
    }
    .data-icon {
      padding-right: 10px;
    }
    .setting-icon {
      padding-right: 10px;
    }
  .el-menu {
    background: inherit;
    border-right: none;
  }
}

</style>
