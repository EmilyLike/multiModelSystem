<template>
  <div class="login">
    <div class="container">
      <div class="system-intro">
        <div class="title">
            <el-icon style="font-size:30px;margin-right:10px;"><help-filled /></el-icon>
            <span>  多 模 态 数 据 采 集 系 统 </span>
        </div>
        <div class="sub-title">
          赋能于 ASR 实验室的多模态数据采集、管理一体化服务系统
        </div>
      </div>
      <el-form class="system-input" ref="formRef" :rules="rules" :model="form" status-icon>
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            placeholder="请输入手机号"
          >
          <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="veriCode">
          <el-input
            style="width:68%;padding-right:2%;"
            type="password"
            v-model="form.veriCode"
            placeholder="请输入验证码">
            <template #prefix>
              <el-icon class="el-input__icon"><cellphone /></el-icon>
            </template>
          </el-input>
          <el-button
          style="width:28%;"
          @click="getValidCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <div class="system-button">
        <el-row type="flex" justify="center" @click="submit">
          <el-button style="width: 100%" type="primary">登录</el-button>
        </el-row>
      </div>
    </div>
    <div class="footer">
      copyright© 2021 北京林业大学人工智能研究所出品
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  setup() {
    const formRef = ref(null);
    const router = useRouter();
    const store = useStore();
    const form = reactive({
      phoneNumber: '',
      veriCode: '',
      code: '',
    });

    const validateNumber = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!value.match(reg)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback();
      }
    };

    const validCode = (rule, value, callback) => {
      if (value !== form.code) {
        callback(new Error('请输入正确的验证码'));
      } else {
        callback();
      }
    };

    const rules = reactive({
      phoneNumber: [{
        required: true, trigger: 'blur', validator: validateNumber,
      }],
      veriCode: [{ required: true, validator: validCode, trigger: 'blur' }],
    });

    const submit = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return;
        await store.dispatch('EDIT_USER_INFO', form);
        router.push({
          path: '/record',
        });
      });
    };

    const getValidCode = () => {
      form.code = '123';
      console.log('here will send a valid code', form.code);
    };
    return {
      form,
      rules,
      formRef,
      submit,
      getValidCode,
    };
  },
};
</script>

<style lang="scss">
.login {
  background-color: #f0f3f7;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  .container {
    flex:1;
    margin-top: 150px;
    .system-intro {
      padding-bottom: 80px;
      .title{
      display: inline-flex;
      align-items: center;
      color: #3a3b3b;
      font-size: 30px;
      text-align: center;
      padding-bottom: 10px;
      }
      .sub-title {
        font-size: 15px;
        color:#979a9c;
      }
    }

    .system-input {
      margin-bottom: 60px;
    }

  }
  .footer {
    height: 50px;
    color:#979a9c;
    margin-top: 20px;
  }
}

</style>
