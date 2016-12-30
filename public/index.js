import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Entity } from 'draft-js';
import copy from 'copy-to-clipboard';

import Editor from '../src/Editor';

import state from './state.json';
import styles from './index.css';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
  createBlockStyleButton,
  createTextAlignmentButton,
  Separator,
  createEntityButton,
} from '../src/plugins/inline-toolbar';
import createBlockBreakoutPlugin from '../src/plugins/breakout';
import createLinkPlugin, { linkStrategy, FormLink, LinkTooltip, LINK, LINK_MUTABILITY } from '../src/plugins/link';
import createLinkObjectPlugin, { linkObjectStrategy, LinkObjectTooltip, LINK_OBJECT, LINK_OBJECT_MUTABILITY } from '../src/plugins/link-object';
import createTooltipPlugin, { tooltipEnhancer } from '../src/plugins/tooltip';
import selectionContainsEntity from '../src/utils/selectionContainsEntity';

import BoldIcon from '../src/icons/BoldIcon';
import ItalicIcon from '../src/icons/ItalicIcon';
import UnderlineIcon from '../src/icons/UnderlineIcon';
import StrikethroughIcon from '../src/icons/StrikethroughIcon';
import HeadingOneIcon from '../src/icons/HeadingOneIcon'
import HeadingTwoIcon from '../src/icons/HeadingTwoIcon'
import HeadingThreeIcon from '../src/icons/HeadingThreeIcon'
import BlockquoteIcon from '../src/icons/BlockquoteIcon'
import UnorderedListIcon from '../src/icons/UnorderedListIcon'
import OrderedListIcon from '../src/icons/OrderedListIcon'
import AlignmentLeftIcon from '../src/icons/AlignmentLeftIcon';
import AlignmentCenterIcon from '../src/icons/AlignmentCenterIcon';
import AlignmentRightIcon from '../src/icons/AlignmentRightIcon';
import LinkIcon from '../src/icons/LinkIcon';
import LinkObjectIcon from '../src/icons/LinkObjectIcon';

const blockBreakoutPlugin = createBlockBreakoutPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
    createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
    createEntityButton({
      entityType: LINK,
      entityMutability: LINK_MUTABILITY,
      isActive: selectionContainsEntity(linkStrategy),
      children: <LinkIcon />,
    }),
    createEntityButton({
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
    }),
    Separator,
    createBlockStyleButton({ blockType: 'header-one', children: <HeadingOneIcon /> }),
    createBlockStyleButton({ blockType: 'header-two', children: <HeadingTwoIcon /> }),
    createBlockStyleButton({ blockType: 'header-three', children: <HeadingThreeIcon /> }),
    createBlockStyleButton({ blockType: 'blockquote', children: <BlockquoteIcon /> }),
    createBlockStyleButton({ blockType: 'unordered-list-item', children: <UnorderedListIcon /> }),
    createBlockStyleButton({ blockType: 'ordered-list-item', children: <OrderedListIcon /> }),
    Separator,
    createTextAlignmentButton({ alignment: 'left', children: <AlignmentLeftIcon /> }),
    createTextAlignmentButton({ alignment: 'center', children: <AlignmentCenterIcon /> }),
    createTextAlignmentButton({ alignment: 'right', children: <AlignmentRightIcon /> }),
  ],
  renderers: {
    [LINK]: FormLink
  }
});

const linkPlugin = createLinkPlugin({ enhancer: tooltipEnhancer });
const linkObjectPlugin = createLinkObjectPlugin({ enhancer: tooltipEnhancer });

const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: LinkTooltip,
    [LINK_OBJECT]: LinkObjectTooltip,
  }
});

const plugins = [
  blockBreakoutPlugin,
  inlineToolbarPlugin,
  linkPlugin,
  linkObjectPlugin,
  tooltipPlugin,
];

class App extends Component {
  handleChange(state) {
    this.state = state;
  }

  getCurrentState() {
    return this.state || state;
  }

  handleLogState() {
    console.log(this.getCurrentState());
  }

  handleCopyStateToClipboard() {
    copy(JSON.stringify(this.getCurrentState(), null, 2));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button onClick={() => this.handleLogState()}>
            Log state
          </button>
          <button onClick={() => this.handleCopyStateToClipboard()}>
            Copy state to clipboard
          </button>
        </div>
        <Editor
          state={state}
          plugins={plugins}
          onChange={state => this.handleChange(state)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
