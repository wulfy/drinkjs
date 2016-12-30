import React, { Component } from 'react';
import { EditorState, Entity, RichUtils } from 'draft-js';

export default ({ entityType, entityMutability, isActive, children, onClick }) => (
  class EntityButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    }

    handleClick(event) {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();

      if (isActive && isActive(editorState)) {
        const selectionState = editorState.getSelection();

        setEditorState(
          RichUtils.toggleLink(
            editorState,
            selectionState,
            null
          )
        );
      } else {
        if ('function' === typeof onClick) {
          onClick && onClick().then(data => {
            this.addEntity(data)
          }).catch(error => {
            console.warn('error', error);
          });
        } else {
          this.props.store.updateItem('entityType', entityType);
        }
      }
    };

    addEntity(data) {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();
      const selectionState = editorState.getSelection();

      const entityKey = Entity.create(entityType, entityMutability, data);

      const newEditorState = RichUtils.toggleLink(
        editorState,
        selectionState,
        entityKey
      );

      setTimeout(() => {
        setEditorState(EditorState.forceSelection(newEditorState, selectionState));
      }, 0);
    }

    preventBubblingUp(event) {
      event.preventDefault();
    }

    render() {
      const { store, theme } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const className = isActive && isActive(getEditorState()) ? `${theme.button} ${theme.active}` : theme.button;
      return (
        <button
          className={className}
          onClick={this.handleClick.bind(this)}
          type="button"
          children={children}
          onMouseDown={this.preventBubblingUp.bind(this)}
        />
      );
    }
  }
)
