import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './style/data.scss'

@Component(
  {
    components: {
      FontAwesomeIcon,
    },
  },
)
export default class Home extends Vue {
  render() {
    return (
        <div class="data-container">
        <div class="data-header">
          <el-dropdown trigger="click" onCommand={this.handleEnum} class="dropdown">
            <el-button type="plain">
              {this.enumText}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu>
              <el-dropdown-item command="按全部">按全部</el-dropdown-item>
              <el-dropdown-item command="按项目">按项目</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-date-picker
            class="datepicker"
            vModel={this.dateRanger}
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" onClick={this.searchData} class="search">查询</el-button>
          <div style="display:inline-block; float:right;">
          <el-button prefix-icon="el-icon-delete">删除</el-button>
          <el-button prefix-icon="el-icon-download">导出</el-button>
          </div>

        </div>
        <div class="data-message">
          <el-button>占位符</el-button>
        </div>
        <div class="data-table">
          <el-table
            data={this.tableData}
            border
            style="width: 90%"
            header-cell-style={{background:'#fafafa', color:'#1b1b1b'}}>
                  <el-table-column type="selection" width="55"/>
              <el-table-column prop="projectName" label="项目名称" width="180" />
              <el-table-column prop="lyricName" label="歌词名称" width="180" />
              <el-table-column prop="state" label="状态" width="100" />
              <el-table-column prop="time" label="创建时间" sortable width="180"/>
              <el-table-column prop="files" label="生成文件" 
                scopedSlots={ { default: (scope: Record<string, any>) => {
                return scope.row.files.map((item: { url: any; name: any; }, i: any) => (
                <a style="color:#64afff;text-decoration:none;" key={i} href={item.url} target="_blank">
                  {item.name}
                  <span style="padding: 0 1px; color:#eaeaea;"> | </span>
                </a>
              ))}, }}> 
            </el-table-column>
          </el-table>
          <el-pagination
            onSizeChange="handleSizeChange"
            onCurrentChange="handleCurrentChange"
            current-page={this.currentPage4}
            page-sizes={[100, 200, 300, 400]}
            page-size={100}
            class="table-pag"
            layout="total, sizes, prev, pager, next, jumper"
            total={400}>
          </el-pagination>
        </div>
  </div>
    );
  }

  enumText = '按全部';

  dateRanger = '';

  currentPage4 = 4;

  tableData = [
    {
      projectName: '两只老虎 1',
      lyricName: '两只老虎1',
      state: '已保存',
      time: '12344',
      files: [
        { name: '音频文件', url: 'https://www.baidu.com/' },
        { name: '视频文件', url: 'https://www.baidu.com/' },
        { name: '语音文本文件', url: 'https://www.baidu.com/' },
        { name: '人脸数据', url: 'https://www.baidu.com/' }],
    },
    {
      projectName: '两只老虎2',
      lyricName: '两只老虎2',
      state: '已保存',
      time: '1234224',
      files: [
        { name: '音频文件', url: 'https://www.baidu.com/' },
        { name: '视频文件', url: 'https://www.baidu.com/' },
        { name: '语音文本文件', url: 'https://www.baidu.com/' },
        { name: '人脸数据', url: 'https://www.baidu.com/' }],
    },
    {
      projectName: '两只老虎3',
      lyricName: '两只老虎3',
      state: '已保存',
      time: '12344333',
      files: [
        { name: '音频文件', url: 'https://www.baidu.com/' },
        { name: '视频文件', url: 'https://www.baidu.com/' },
        { name: '语音文本文件', url: 'https://www.baidu.com/' },
        { name: '人脸数据', url: 'https://www.baidu.com/' }],
    },
  ]
  
  handleEnum(value:string) {
    console.log('this is enum', value);
  }

  searchData() {
    console.log('this is searchData');
  }
}
