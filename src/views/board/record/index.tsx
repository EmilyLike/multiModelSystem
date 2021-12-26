import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  render() {
    return (
        <router-view></router-view>);
  }
}
