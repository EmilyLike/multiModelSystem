<template>
  <div class="project-board">
    <div class="content-board">
      <div class="content-inter">
              <div class="content-input" v-if="showInput">
        <div v-for="(item, index) in questionList" :key="index">
          <el-input
            class="lyric-input"
            v-model="item.question"
            placeholder="| Please input"
            ref="refChartBox"
            style="border:0;"
            @keyup.enter="addRow(index)" />
        </div>
      </div>
      <div class="content-lyric" v-else>
        <div
        :class="`sentence-${index}`"
        :style="lyricStyle(index)"
        v-for="(item, index) in questionList" :key="index">
          {{item.question}}
        </div>
      </div>
      </div>

      <div class="content-button">
        <el-button type="primary" v-if="showEdit" @click="editLyric">编辑</el-button>
        <el-button type="primary" v-else @click="confLyric">确定</el-button>
      </div>
    </div>

    <div class="video-board">
      11111
    </div>
    <div class="record-button">
      <el-button type="primary" @click="revideo">重录</el-button>
      <el-button type="primary" @click="reLast">重录上一句</el-button>
      <el-button type="primary" @click="pauseRecord">{{recordState}}</el-button>
      <el-button type="primary" @click="endRecord">结束</el-button>
    </div>
    <div class="list-board">
      <el-table
      :data="tableData"
      border
      style="width: 90%"
      :header-cell-style="{background:'#fafafa', color:'#1b1b1b'}">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="state" label="状态" width="180" />
        <el-table-column prop="time" label="创建时间" sortable/>
        <el-table-column prop="files" label="生成文件">
          <template v-slot="scope" >
            <a
            style="color:#64afff;text-decoration:none;"
            v-for="(item,i) in scope.row.files" :key="i" :href="item.url" target="_blank">
              {{item.name}}
              <span style="padding: 0 1px; color:#eaeaea;"> | </span>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ElMessageBox } from 'element-plus';
import { getCurrentInstance, ref } from 'vue';
import NewItem from '@/components/newItem.vue';
// improt {NewItem}

@Options(
  {
    components: {
      NewItem,
      FontAwesomeIcon,
    },
  },
)
export default class Home extends Vue {
    divs = ref(null);

    dialogVisible=false;

    textarea2='';

    time = 0;

    showInput = true;

    recordState = '开始'

    questionList= [
      { question: '' },
    ];

    showEdit= false;

    proxy = getCurrentInstance();

    // refQuestion = ref(null);

    tableData = [
      {
        name: '两只老虎',
        state: '已保存',
        time: '12344',
        files: [{ name: '音频文件', url: 'https://www.baidu.com/' },
          { name: '人脸文件', url: 'https://www.baidu.com/' }],
      },
    ]

    confLyric():void {
      this.showInput = false;
      this.showEdit = true;
      // eslint-disable-next-line array-callback-return
      this.questionList.map((q):void => { console.log('this is ddd', q.question); });
    }

    editLyric():void {
      this.showEdit = false;
      this.showInput = true;
    }

    closeDialog():void {
      this.dialogVisible = false;
    }

    revideo():void {
      this.time = 0;
      console.log('this is revideo');
    }

    // eslint-disable-next-line class-methods-use-this
    lyricStyle(index:number):string {
      return 'color:red;';
    }

    addRow(index: number):void {
      // 增加行
      const obj = { question: '' };
      this.questionList.splice(index + 1, 0, obj);

      console.log('this is div', this.divs);

      // 聚焦
      this.$nextTick(() => {
        (this.divs as any).question[index + 1].focus();
      });
    }

    pauseRecord():void {
      console.log('this is record', this.recordState);
      if (this.recordState === '开始') {
        this.recordState = '暂停';
      }
    }
}
</script>
<style lang="scss">
.project-board{
  box-sizing: content-box;
  display: flex;
  flex-wrap: wrap;
  padding:20px;
  .content-board {
    flex: 0 0 30%;
    .content-inter {

      height: 300px;
      border: 1px solid black;
    }
    .content-lyric {
      text-align: center;
    }
    .lyric-input .el-input__inner {
      border: 0px;//改成0，边框就消失了！
    }
  }
  .content-button {

  }
  .video-board {
    flex: 0 0 70%;
    border: 1px solid black;
  }
  .record-button {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    // align-items: center;
  }
  .list-board {
    width: 100%;
  }
}

</style>
