<template>
  <div class="project-board">
    <div class="content-board">
      <div class="content-inter">
        <div class="content-input" v-if="showInput">
          <el-input
            type="textarea"
            class="lyric-input"
            placeholder="请输入内容"
            v-model="textarea"
            rows="13"
            maxlength="5000"
            show-word-limit
          />
        </div>
      <div class="content-lyric" v-else>
        <div
        :class="`sentence-${index}`"
        :style="lyricStyle(index)"
        v-for="(lyric, index) in lyricList" :key="index">
          {{lyric}}
        </div>
      </div>
      </div>
    </div>

    <div class="video-board">
      <video width="320"
      height="240"
      style="width:100%; height:100%;" controls autoplay playsinline ref="video"></video>
    </div>
    <div class="record-button">
      <div class="content-button">
        <el-button type="primary" v-if="showEdit" @click="editLyric">编辑</el-button>
        <el-button type="primary" v-else @click="confLyric">确定</el-button>
      </div>
      <el-button type="primary" @click="revideo">重录</el-button>
      <el-button type="primary" @click="reLast">重录上一句</el-button>
      <el-button type="primary" @click="pauseRecord">{{recordState}}</el-button>
      <el-button @click="endRecord">结束</el-button>
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
import RecordRTC from 'recordrtc';
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
  // TODO: $ref 调用 DONE
  // TODO: 歌词区样式
  // TODO:video-API 调用 完成进度：
  // 使用 webrtc 完成录制和文件流，可以进行录制和保存。流程、思路待完善。
  // 尝试失败项目：使用 video 标签同步展示录制。 失败原因：无法控制 video 大小。
  /**
   * 思路整理：
   * 1、使用 canvas 作为录制影像展示。并记录时间。
   * 2、点击开始录制按钮，使用浏览器自带获取录制和麦克风权限。并通过 recordrtc 记录视频。
   * 3、在 canvas 中实时展示影响和时间。
   * 4、点击空格，recordrtc 保存视频，并发出请求。（可先忽略）
   * 5、点击结束，recordrtc 保存视频，并以 mp4的格式发往后端进行解析。
   * */
  // TODO:将项目上传到 github DONE
    divs = ref(null);

    dialogVisible=false;

    time = 0;

    textarea = '';

    showInput = true;

    recordState = '开始'

    showEdit= false;

    proxy = getCurrentInstance();

    video: HTMLVideoElement | null = null;

    recorder: RecordRTC| null = null;

    mounted():void {
      this.video = document.querySelector('video');
    }

    // captureCamera(callback) {
    //   navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
    //     callback(camera);
    //   }).catch((error) => {
    //     this.$message.error('未找到视频设备');
    //   });
    // }

    // stopRecordingCallback() {
    //   if (this.video) {
    //     this.video.src = this.video.srcObject = null;
    //     this.video.muted = false;
    //     this.video.volume = 1;
    //     this.video.src = URL.createObjectURL(this.recorder!.getBlob());
    //     window.open(URL.createObjectURL(this.recorder!.getBlob()));
    //     this.recorder!.camera.stop();
    //     this.recorder!.destroy();
    //     this.recorder = null;
    //   }
    // }

    // startRecording() {
    //   console.log(this.video);
    //   this.captureCamera((camera) => {
    //     this.video!.muted = true;
    //     this.video!.volume = 0;
    //     this.video!.srcObject = camera;
    //     this.recorder = new RecordRTC(camera, {
    //       type: 'video',
    //     });
    //     this.recorder.startRecording();
    //     // release camera on stopRecording
    //     this.recorder.camera = camera;
    //   });
    // }

    // stopRecording() {
    //   this.recorder && this.recorder.stopRecording(this.stopRecordingCallback);
    // }

    tableData = [
      {
        name: '两只老虎',
        state: '已保存',
        time: '12344',
        files: [{ name: '音频文件', url: 'https://www.baidu.com/' },
          { name: '人脸文件', url: 'https://www.baidu.com/' }],
      },
    ]

    get lyricList():string[] {
      return this.textarea.split('\n');
    }

    confLyric():void {
      this.showInput = false;
      this.showEdit = true;
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

    endRecord():void {
      if (this.recorder) {
        this.recorder.stopRecording(() => {
          const blob = this.recorder!.getBlob();
          // this.videoFile = this.recorder.getBlob();

          // 将blob转换为可以供video播放的url
          const url = window.URL.createObjectURL(blob);

          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = '录屏.mp4';
          downloadLink.click();
        });
      }
    }

    pauseRecord():void {
      console.log('this is record', this.recordState);
      if (this.recordState === '开始录制') {
        this.recordState = '暂停录制';
      }
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }).then(async (stream) => {
        this.video!.muted = true;
        // this.video!.volume = 20;
        this.video!.srcObject = stream;
        this.recorder = new RecordRTC(stream, {
          type: 'video',
        });
        this.recorder.startRecording();
      });
    }
}
</script>
<style lang="scss">
.project-board{
  // box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding:20px;
  .content-board {
    // width:300px;
    flex: 0 0 30%;
    .content-inter {
      background-color: #f2f2f2;
      overflow: scroll;
      height: 300px;
      border: 1px solid #f2f2f2;
      border-radius: 2px;
    }
    .content-lyric {
      text-align: center;
    }
    .lyric-input .el-textarea__inner {
      // height: 100%;
      border: 0px;//改成0，边框就消失了！
    }
  }
  .content-button {

  }
  .video-board {
    flex: 0 0 60%;
    margin-left: 20px;
    border: 1px solid #f2f2f2;
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
