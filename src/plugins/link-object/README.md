# Plugin link object

Link object plugin provide components for link object entity:

    - LinkObject: use by decorator for displaying a link in document
    - LinkObjectTooltip: use with the tooltip plugin

Here's some code!

```javascript
// import create entity button
import createInlineToolbarPlugin, {
  ...,
  createEntityButton,
} from '../src/plugins/inline-toolbar';
// import link object plugin
import createLinkObjectPlugin, { linkObjectStrategy, LinkObjectTooltip, LINK_OBJECT, LINK_OBJECT_MUTABILITY } from '../src/plugins/link-object';
// import helper for checking if selection contains a link entity
import selectionContainsEntity from '../src/utils/selectionContainsEntity';
// import link icon
import LinkObjectIcon from '../src/icons/LinkObjectIcon';

// create LINK entity button and define when button is active
const LinkObjectButton = createEntityButton({
  entityType: LINK_OBJECT,
  entityMutability: LINK_OBJECT_MUTABILITY,
  isActive: selectionContainsEntity(linkObjectStrategy),
  children: <LinkObjectIcon />,
  onClick: () => {
    // emulate modal result
    return new Promise(resolve => {
      const section = {
        id: 146,
        type: 'section',
        title: 'Chemises et tuniques',
        url: '/chemises-et-tuniques-femme/',
      };
  
      resolve(section);
    });
  }
});

// add link button to inline toolbar and define is renderer
const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    ...,
    LinkObjectButton,
    ...,
  ]
});
```
