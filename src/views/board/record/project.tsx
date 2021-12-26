import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import RecordRTC, { getSeekableBlob } from 'recordrtc';
import NewItem from '@/components/newItem';
import '../style/project.scss';

@Component(
  {
    components: {
      NewItem,
      FontAwesomeIcon,
    },
  },
)
export default class Project extends Vue {
  render() {
    return (<div class="project-board">
    <div class="content-board">
      <div class="content-inter">
        { this.showInput
          ? (<div class="content-input" >
              <el-input
                type="textarea"
                class="lyric-input"
                placeholder="请输入内容"
                v-model={this.textarea}
                rows="12"
                maxlength="5000"
                show-word-limit />
            </div>)
          : (<div class="content-lyric">
              { this.lyricList.map((lyric, index) => (
              <div class={`sentence-${index}`}
                style={'lyricStyle(index)'}
                key={index}>
                  {lyric}
              </div>))
              }
            </div>)
        }
        <div class="content-button" style="float:right;">
          <el-button type="primary" size="mini" onClick={this.clickLyricBtn}>
            {this.showInput ? '确定' :'编辑'}
          </el-button>  
        </div>
      </div>
    </div>
    <div class="video-board">
        { <div id="videoTimer" style={`position: absolute; display:${this.recordState==='已开始' ? 'block':'none'};`}>
          </div>
        }
        <div class="video-start-background" style={`display:${this.stateText === '开始' ? 'flex':'none'};`}>
            请点击开始，进行录制
        </div>  
        <video 
          style={`display:${this.stateText !=='开始' ? 'block':'none'};
          width:100%;height:100%;object-fit:center;
          `}
          controls={false}
          autoplay playsinline ref="video"></video>   
    </div>
    <div class="record-button">
      <el-button type="primary" onClick={this.revideo}>重录</el-button>
      <el-button type="primary" onClick={this.reLast}>重录上一句</el-button>
      <el-button type="primary" onClick={this.pauseRecord} ref="btnState">
        {this.stateText}
      </el-button>
      <el-button onClick={this.endRecord}>结束</el-button>
    </div>
    <div class="list-board">
      <el-table
      data={this.tableData}
      border
      style="width: 90%"
      header-cell-style={{background:'#fafafa', color:'#1b1b1b'}}>
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="state" label="状态" width="180" />
        <el-table-column prop="time" label="创建时间" sortable/>
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
    </div>
      </div>
    );
  }

    time = 0;

    stateText = '开始';

    textarea = '';

    showInput = true;

    recordState = '未开始'

    video: HTMLVideoElement | null = null;

    recorder: RecordRTC| null = null;

    mounted():void {
      this.video = document.querySelector('video');
    }

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

    startTime = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
    
    setTimerUp() {
      localStorage.setItem("startTime", this.startTime.toString()); // Store it if I want to restart the timer on the next page
      this.startTimeCounter();
    }


    startTimeCounter() {
      const now = Math.floor(Date.now() / 1000); // get the time now
      const diff = now - this.startTime; // diff in seconds between now and start
      const m = Math.floor(diff / 60); // get minutes value (quotient of diff)
      const s = Math.floor(diff % 60); // get seconds value (remainder of diff)
      const cm = this.checkTime(m); // add a leading zero if it's single digit
      const cs = this.checkTime(s); // add a leading zero if it's single digit
      document.getElementById("videoTimer")!.innerHTML = cm + ":" + cs; // update the element where the timer will appear
      const t = setTimeout(this.startTimeCounter, 500); // set a timeout to update the timer
    }

     checkTime(i:number) {
       let s;
        if (i < 10) {s = "0" + i} // add zero in front of numbers < 10
        return s;
    }

    clickLyricBtn():void {
      // TODO:点击确定时，对输入内容进行简单校验
      this.showInput = !this.showInput;
      if(this.showInput) {
        // TODO:send reuqest
      }
    }

    revideo():void {
      this.time = 0;
      console.log('this is revideo');
    }

    reLast() {
      console.log('ddd');
    }

    lyricStyle(index:number):string {
      return 'color:#3597fe;font-size:14px;';
    }

    endRecord():void {
      // 1、时间置零
      // 2、状态只为开始
      this.stateText='开始';
      if (this.recorder) {
        this.recorder.stopRecording(() => {
          getSeekableBlob(this.recorder!.getBlob(), function(seekableBlob: any) {
            // video.src = URL;
            const url = window.URL.createObjectURL(seekableBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = '录屏.mp4';
            downloadLink.click();
        });
          // 将blob转换为可以供video播放的url
          // window.open(url);
          (this.recorder as any).stream.stop();
          this.recorder!.destroy();
          this.recorder = null;
        });
      }
    }

    pauseRecord():void {
      console.log('this is record', this.$refs.btnState);
      // 点击开始
      if (this.stateText === '开始') {
        this.setTimerUp();
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

          // disable-elsint
          (this.recorder as any).stream = stream;
          this.recorder.startRecording();
        });
        this.stateText = '暂停';
      } else  if(this.stateText === '暂停'){
        this.recorder?.pauseRecording();
        this.video?.pause();
        this.stateText='继续';
        // 点击暂停
        // this.recordState = '未开始';
      } else {
        this.stateText = '暂停';
        this.video?.play();
        this.recorder?.resumeRecording();
      }

    }
}
