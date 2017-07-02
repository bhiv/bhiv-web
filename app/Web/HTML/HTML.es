/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  const escape = function (value) {
    return value;
  };

  const tags = { iframe: { autoClose: false }
               , script: { autoClose: false }
               , img: { props: { alt: '' } }
               };

  node.on('append', function ({ flow, struct }, callback) {
    const construction = flow._construction || [];
    flow._construction = construction;

    switch (struct.type) {
    case 'html':
      if (struct.html != null) construction.push(struct.html);
      else if (struct.altHtml != null) construction.push(struct.altHtml);
      return callback(null, flow);
    case 'text':
      if (struct.text != null) construction.push(escape(struct.text));
      else if (struct.altText != null) construction.push(escape(struct.altText));
      return callback(null, flow);
    case 'node':
      const config = tags[struct.tag] || {};
      construction.push('<', struct.tag);
      for (let prop in struct.props) {
        construction.push(' ', prop);
        if (struct.props[prop] == null) continue ;
        construction.push('="', escape(struct.props[prop]), '"');
      }
      for (let prop in struct.defProps) {
        if (struct.props && prop in struct.props) continue ;
        construction.push(' ', prop);
        if (struct.defProps[prop] == null) continue ;
        construction.push('="', escape(struct.defProps[prop]), '"');
      }
      for (let prop in config.props) {
        if (struct.props && prop in struct.props) continue ;
        if (struct.defProps && prop in struct.defProps) continue ;
        construction.push(' ', prop);
        if (config.props[prop] == null) continue ;
        construction.push('="', escape(struct.props[prop]), '"');
      }
      if (struct.children) {
        construction.push('>');
        return this.execute(struct.children, flow, (err, result) => {
          if (err) return callback(err);
          construction.push('</', struct.tag, '>');
          return callback(null, flow);
        });
      } else if (config.autoClose === false) {
        construction.push('</', struct.tag, '>');
      } else {
        construction.push('/>');
        return callback(null, flow);
      }
    default:
      return callback(new Error('Unknown construction type'));
    }
  });

  node.on('serialize', function ({ _construction }) {
    return _construction ? _construction.join('') : '<!-- no HTML content -->';
  });

};
