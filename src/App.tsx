import { Component, Vue } from 'vue-property-decorator';
import './style.scss';

@Component
export default class Home extends Vue {
  render() {
    return (<div id="app">
      <router-view/>
    </div>
    );
  }
}
