import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import createInlineStyleButton from './utils/createInlineStyleButton';
import createBlockStyleButton from './utils/createBlockStyleButton';
import createBlockAlignmentButton from './utils/createBlockAlignmentButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';
import getTextAlignment from './utils/getTextAlignment';

import styles from './textAlignment.css';

const createInlineToolbarPlugin = ({ buttons = [] } = {}) => {
  const store = createStore({
    isVisible: false,
  });

  const toolbarProps = {
    store,
    buttons,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      if (selection.getHasFocus() && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
      }
      return editorState;
    },
    blockStyleFn: (contentBlock) => {
      const alignment = getTextAlignment(contentBlock);

      if (alignment) {
        return styles[alignment];
      }
    },
    InlineToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export default createInlineToolbarPlugin;

export {
  Separator,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
};
