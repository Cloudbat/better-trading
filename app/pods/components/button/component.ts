// Vendor
import Component from '@glimmer/component';
import {action} from '@ember/object';

interface Args {
  label?: string;
  icon?: string;
  href?: string;
  theme: 'blue' | 'gold' | 'red';
  onClick?: () => {};
}

export default class Button extends Component<Args> {
  @action
  handleClick() {
    if (!this.args.onClick) return;

    this.args.onClick();
  }
}
