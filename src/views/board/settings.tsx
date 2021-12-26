import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  render() {
    return (<div class="settings">
      <div class="video-quality">
        <span> 录像画质</span>
        <el-radio vModel={this.videoQua} label="1">原画</el-radio>
        <el-radio vModel={this.videoQua} label="2">高清</el-radio>
        <el-radio vModel={this.videoQua} label="3">标清</el-radio>
      </div>
      <div class="video-save">
        <span>保存录像</span>
        <el-radio vModel={this.saveRadio} label="1">是</el-radio>
        <el-radio vModel={this.saveRadio} label="2">否</el-radio>
      </div>
      {
        this.saveRadio && (
          <div class="save-root">
          <span> 本地保存地址</span>
        </div>
        )
      }

  </div>);
  }

  saveRadio = '';
  videoQua = '';
  saveRoot = '';
}
