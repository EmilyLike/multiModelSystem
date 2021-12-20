<template>
<div class="aside">
  <el-container>
    <el-aside class="aside">
        <el-menu
        text-color="#c6ccd3"
        active-text-color="#1990ff"
        default-active="record"
        router
        >
            <el-menu-item index="record" @click="storeRoot">
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useStore } from 'vuex';

@Options(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Layout extends Vue {
  store = useStore();

  item = null;

  storeRoot(item:any):void {
    this.item = item;
    this.store.commit('changemenuName', item);
    console.log('this is item', item);
  }
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
