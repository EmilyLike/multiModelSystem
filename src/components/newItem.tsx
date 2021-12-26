import { Component, Vue, Prop } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './style/newItem.scss';

@Component(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class NewItem extends Vue {
    @Prop({ type: Boolean, default: true })
    dialogVisible!: boolean;

    render() {
      return (
        <div class="new-item-form">
        <el-dialog
        title="新建项目"
        visible={this.dialogVisible}
        close-on-click-modal={false}
        width="30%"
        before-close={this.clickCancel}
        class="my-info-dialog">
        <el-form ref="project" vModel={this.form} label-width="120px" label-position="top">
          <el-form-item label="请输入项目名称" style="padding: 0px 20px;">
            <el-input v-model={this.form.name} placeholder="例如歌曲名字"></el-input>
          </el-form-item>
        </el-form>
            <span class="dialog-footer" slot="footer">
              <el-button onClick={this.clickCancel}>取消</el-button>
              <el-button type="primary" onClick={this.submitForm}
                >确定</el-button
              >
            </span>
        </el-dialog>
      </div>
      );
    }

    form = {
      name: '',
    };

    clickCancel() {
      this.$emit('close', false);
    }

    submitForm() {
      this.$emit('close', false);
      // this.$store.commit('changemenuName', menuName+this.$route.params);
      this.$router.push(
        {
          name: 'recordProject',
          params:{
            id:this.form.name,
          }
        },
      );
      const {menuName} = this.$store.getters
      this.$store.commit('changemenuName', menuName+'/录制项目/'+this.form.name);
      console.log('current route', this.$route, this.$store.getters.menuName);
    }
}
