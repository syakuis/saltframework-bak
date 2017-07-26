/**
 * @date 2017-02-20
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  inline: PropTypes.bool,
  elementId: PropTypes.string.isRequired,
  data: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  config: PropTypes.object,

  onRequestData: PropTypes.func.isRequired,
};

const defaultProps = {
  inline: false,
  width: '100%',
  height: '100%',
  data: '',
  config: {
    resize_enabled: true,
    enterMode: window.CKEDITOR.ENTER_BR,
    shiftEnterMode: window.CKEDITOR.ENTER_P,
    toolbarCanCollapse: true,
    font_names: 'Nanum Gothic; 돋음; 굴림; 굴림체; 고딕; 궁서; 궁서체; Arial/Arial; Helvetica; sans-serif; Times New Roman/Times New Roman; Times; serif; Verdana;',
    toolbar: /* 'Full'*/[
      ['Undo', 'Redo'],
      ['Image', 'Flash', 'Table', 'Link', 'Unlink', 'SpecialChar'],
      ['PageBreak', 'HorizontalRule'],
      ['Blockquote', 'NumberedList', 'BulletedList'],
      ['Maximize', 'ShowBlocks', 'Preview'],
      ['Source'],
      /* [ 'About' ],*/
      '/',
      ['Font', 'FontSize', 'TextColor', 'BGColor'],
      ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat'],
      ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      ['Outdent', 'Indent'],
    ],
  },
};

class Ckeditor extends React.Component {
  constructor(props) {
    super(props);
    this.elementId = `editor_${this.props.elementId}`;
    this.onChangeData = this.onChangeData.bind(this);
  }

  componentDidMount() {
    const element = this.element;
    const editor = window.CKEDITOR;

    if (this.props.inline === true) {
      editor.inline(element.id, this.props.config);
    } else {
      editor.replace(element.id, this.props.config);
    }

    editor.instances[element.id].setData(this.props.data);

    editor.instances[element.id].on('blur', () => {
      this.onChangeData();
    });
  }

  onChangeData() {
    const element = this.element;

    const data = window.CKEDITOR.instances[element.id].getData();
    this.props.onRequestData(data);
  }

  render() {
    if (this.props.inline === true) {
      return (
        <div
          ref={(e) => { this.element = e; }}
          contentEditable="true"
          id={this.elementId}
          style={{ width: this.props.width, height: this.props.height }}
        />
      );
    }
    return (
      <div
        ref={(e) => { this.element = e; }}
        id={this.elementId}
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }
}

Ckeditor.propTypes = propTypes;

Ckeditor.defaultProps = defaultProps;

export default Ckeditor;
