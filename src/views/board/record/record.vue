<template>
  <div class="record-board">
    <div class="new-item">
          <el-button class="box-card" @click="handleclick">
            <font-awesome-icon class="record-icon" icon="plus" />
            新建项目
          </el-button>
    </div>
    <new-item v-if="dialogVisible" :dialogVisible="dialogVisible" @close="closeDialog"></new-item>
    <div class="all-data">
      <span>全部项目</span>
      <el-divider class="data-divider"></el-divider>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
import NewItem from '@/components/newItem.vue';

@Options(
  {
    components: {
      NewItem,
      FontAwesomeIcon,
    },
  },
)
export default class Home extends Vue {
    dialogVisible=false;

    closeDialog() {
      this.dialogVisible = false;
    }

    handleclick():void {
      this.dialogVisible = true;// 默认页面不显示为false,点击按钮将这个属性变成true
      console.log('this is dial', this.dialogVisible);
    }

    // eslint-disable-next-line class-methods-use-this
    handleClose(done:any):void {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    }
}
</script>
<style lang="scss">
.record-board{
  margin: 20px;
  .new-item {
    .box-card {
      .record-icon {
        size:10px
      }
      border: 1px black dashed;
      margin-bottom: 20px;
    }
  }
  .all-data {
    .el-divider {
    margin-top: 10px;
    }
  }
}

</style>
