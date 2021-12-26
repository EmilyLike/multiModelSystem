import { Component, Vue } from 'vue-property-decorator';
import { MessageBox } from 'element-ui';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import NewItem from '@/components/newItem';
import '../style/record.scss';

@Component(
  {
    components: {
      NewItem,
      FontAwesomeIcon,
    },
  },
)
export default class Home extends Vue {
  render() {
    return (<div>
      <div class="record-board">
      <div class="new-item">
            <el-button class="box-card" onClick={this.handleclick} icon="el-icon-plus">
              新建项目
            </el-button>
      </div>
      {
        this.dialogVisible && (
          <new-item dialogVisible={this.dialogVisible} onClose={this.closeDialog}></new-item>
        )
      }

      <div class="all-data">
        <span>全部项目</span>
        <el-divider class="data-divider"></el-divider>
      </div>
    {/* <router-view></router-view> */}
    </div>
    </div>
    );
  }

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
      MessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    }
}
