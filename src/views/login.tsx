import { Component, Vue } from 'vue-property-decorator';
import './login.scss';

@Component
export default class Login extends Vue {
  render() {
    return (<div class="login">
      <div class="container">
        <div class="system-intro">
          <div class="title">
              <i class="el-icon-s-help" style="font-size:30px;margin-right:10px;"></i>
              <span>  多 模 态 数 据 采 集 系 统 </span>
          </div>
          <div class="sub-title">
            赋能于 ASR 实验室的多模态数据采集、管理一体化服务系统
          </div>
        </div>
        <el-form class="system-input" ref="formRef" rules={this.rules} props={{ model: this.form }} status-icon>
          <el-form-item prop="phoneNumber">
            <el-input
              vModel={this.form.phoneNumber}
              placeholder="请输入手机号"
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="veriCode">
            <el-input
              style="width:65%; margin-right:1%;"
              type="password"
              vModel={this.form.veriCode}
              placeholder="请输入验证码"
              prefix-icon="el-icon-phone">
            </el-input>
            <el-button
              style="width:34%;color:#808080;"
              onClick={this.sendCode}
              disabled={this.form.disabled}
              >
              {this.form.btnText}
            </el-button>
          </el-form-item>
        </el-form>
        <div class="system-button">
          <el-row type="flex" justify="center" >
            <el-button style="width: 100%" type="primary" onClick={this.submit}>登录</el-button>
          </el-row>
        </div>
      </div>
      <div class="footer">
        copyright© 2021 北京林业大学人工智能研究所出品
      </div>
    </div>
    );
  }

  form = {
    phoneNumber: '',
    veriCode: '',
    code: '',
    time: 60,
    btnText: '发送验证码',
    disabled: false,
  };

  validateNumber = (rule: any, value: string, callback: (arg0?: Error | undefined) => void) => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!value) callback(new Error('请输入手机号'));
    if (!value.match(reg)) {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  };

  validCode = (rule: any, value: string, callback: (arg0?: Error | undefined) => void) => {
    if (!value) callback(new Error('请输入验证码'));
    if (value !== this.form.code) {
      callback(new Error('请输入正确的验证码'));
    } else {
      callback();
    }
  };

  rules = {
    phoneNumber: [{
      required: true, trigger: 'blur', validator: this.validateNumber,
    }],
    veriCode: [{ required: true, validator: this.validCode, trigger: 'blur' }],
  };

  submit = () => {
    console.log(this.$refs.formRef);
    (this.$refs.formRef as any).validate(async (valid: any) => {
      if (!valid) {
        return;
      }
      await this.$store.dispatch('EDIT_USER_INFO', this.form.phoneNumber);

      this.$router.replace('/record').catch((err) => {
        console.log(err);
      });
      // this.$router.push({
      //   path: '/record',
      // });
    });
  };

  created() {
    console.log('this is cre');
  }

  getValidCode() {
    this.form.code = '123';
  }

  sendCode() {
    (this.$refs.formRef as any).validateField('phoneNumber', (errorMessage: any) => {
      if (!errorMessage) {
        // 1.时间开始倒数
        // 2.按钮进入禁用状态
        // 3.如果倒计时结束 按钮恢复可用状态 按钮文字变为重新发送, 时间重置
        // 4.倒计时的过程中 按钮文字为 多少s后重新发送
        const timer = setInterval(() => {
          this.form.time -= 1;
          this.form.btnText = `${this.form.time}s后重新发送`;
          this.form.disabled = true;
          if (this.form.time === 0) {
            this.form.disabled = false;
            this.form.btnText = '重新发送';
            this.form.time = 60;
            clearInterval(timer);
          }
        }, 1000);
        this.$message.success('发送验证码成功');
        this.getValidCode();
      }
    });
  }
}
