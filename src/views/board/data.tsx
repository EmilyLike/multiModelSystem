import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
        <div>
        this.dat
  </div>
    );
  }
}
