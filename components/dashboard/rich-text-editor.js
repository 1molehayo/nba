import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

class RichTextEditor extends React.Component {
  isMounted = false;

  constructor(props) {
    super(props);

    this.content = this.props.content;
  }

  componentDidMount() {
    this.isMounted = true;

    if (this.content) {
      const contentBlock = htmlToDraft(this.props.content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);

        this.props.setEditorState(editorState);
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  onEditorStateChange = (editorState) => {
    if (this.isMounted) {
      this.props.setEditorState(editorState);
    }
  };

  render() {
    const { editorState } = this.props;

    return (
      <div className="mb-5">
        <Editor
          ref={this.props.innerRef}
          initialEditorState={EditorState.createEmpty()}
          editorState={editorState}
          toolbarClassName="rich-text-toolbar"
          wrapperClassName="rich-text-wrapper"
          editorClassName="rich-text"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  content: PropTypes.string,
  innerRef: PropTypes.any,
  editorState: PropTypes.any,
  setEditorState: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  <RichTextEditor innerRef={ref} {...props} />
));
