<template>
  <div class="record-board">
    <div class="new-item">
          <el-button class="box-card" @click="handleclick">
            <font-awesome-icon class="record-icon" icon="plus" />
            新建项目
          </el-button>
    </div>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
    <div class="all-data">
      <span>全部项目</span>
      <el-divider class="data-divider"></el-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ElMessageBox } from 'element-plus';

@Options(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Home extends Vue {
    dialogVisible=false;

    handleclick():void {
      this.dialogVisible = true;// 默认页面不显示为false,点击按钮将这个属性变成true
    }

    // eslint-disable-next-line class-methods-use-this
    handleClose(done):void {
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
