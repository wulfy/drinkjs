import LinkObject from './components/LinkObject';
import LinkObjectTooltip from './components/LinkObjectTooltip';

import linkObjectStrategy from './utils/linkObjectStrategy';
import { LINK_OBJECT, LINK_OBJECT_MUTABILITY } from './utils/constants';

const createLinkObjectPlugin = ({ enhancer }) => {
  // return enhanced and decorated link object or default decorated link object
  const LinkObjectComponent = 'function' === typeof enhancer
    ? enhancer(LinkObject)
    : LinkObject;

  return {
    decorators: [{
      strategy: linkObjectStrategy,
      component: LinkObjectComponent,
    }]
  };
}

export default createLinkObjectPlugin;

export {
  linkObjectStrategy,
  LinkObjectTooltip,
  LINK_OBJECT,
  LINK_OBJECT_MUTABILITY,
}
