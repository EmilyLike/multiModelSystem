<template>
  <div class="new-item-form">
    <el-dialog
    title="新建项目"
    :model-value="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :before-close="clickCancel"
    class="my-info-dialog">
    <el-form ref="project" :model="form" label-width="120px" label-position="top">
      <el-form-item label="请输入项目名称">
        <el-input v-model="form.name" placeholder="例如歌曲名字"></el-input>
      </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clickCancel()">取消</el-button>
          <el-button type="primary" @click="submitForm"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Options(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class NewItem extends Vue {
    @Prop({ type: Boolean, default: true })
    dialogVisible!: boolean;

    form = {
      name: '',
    };

    created() {
      console.log('this is dailoig', this.dialogVisible);
    }

    clickCancel() {
      this.$emit('close', false);
      // this.$emit('update:dialogVisible', false);
    }

    submitForm() {
      this.$emit('close', false);
      this.$router.push(
        {
          name: 'recordProject',
        },
      );
      console.log('this is form', this.form);
    }
}
</script>
<style lang="scss">
.new-item-form {
  .my-info-dialog .el-dialog__body {
      padding: 0px;
    }
}
</style>
