export default {
  modules: {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    },
    htmlEditButton: {
      msg: ' ',
      okText: 'Ok',
      cancelText: 'Cancel',
      buttonHTML: 'HTML',
      buttonTitle: 'Show HTML source',
      syntax: false,
      prependSelector: 'div#myelement',
      editorModules: {}
    }
  },
  formats: [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]
};
