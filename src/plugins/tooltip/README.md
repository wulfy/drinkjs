# Plugin tooltip

Tooltip plugin works only with entity type and compatible plugin, it allow to wrap an inline element with tooltip functionnaly (onEnter and onLeave).

For wrapping a component with tooltip, you need to use the tooltip enhancer and add a custom renderer to the tooltip plugin for the desired entity type:

Here's some code!

```javascript
// get the tooltip enhancer
import createTooltipPlugin, { tooltipEnhancer } from '../src/plugins/tooltip';
// import link plugin with the LinkTooltip
import createLinkPlugin, { LINK, LinkTooltip } from '../src/plugins/link';
import createLinkObjectPlugin, { LINK_OBJECT, LinkObjectTooltip } from '../src/plugins/link-object';

// link plugin is compatible and have an enhancer property
const linkPlugin = createLinkPlugin({ enhancer: tooltipEnhancer });
const linkObjectPlugin = createLinkObjectPlugin({ enhancer: tooltipEnhancer });

// define the custom renderer for LINK & LINK OBJECT entities
const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: LinkTooltip,
    [LINK_OBJECT]: LinkObjectTooltip,
  }
});
```
