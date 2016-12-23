import { Entity } from 'draft-js';

import Card from './components/Card';

import Html from './components/Html';
import createSideToolbarButton from './utils/createSideToolbarButton';

export default (props) => {
  return {
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();
        const data = entity.getData();

        if (type !== 'embed') {
          return null;
        }


        if (data.html) {
          return {
            component: Html,
            editable: false,
            props: { html: data.html },
          };
        }

        return {
          component: Card,
          editable: false,
          props: { ...data },
        };
      }

      return null;
    },
    createSideToolbarButton: () => createSideToolbarButton(props),
  };
};
