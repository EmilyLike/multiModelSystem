import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  render() {
    return (<div class="record">
      this is settings.
  </div>);
  }
}