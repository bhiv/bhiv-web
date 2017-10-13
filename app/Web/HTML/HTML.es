/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  const escape = require('escape-html');

  const tags = { area: { leaf: true }
               , base: { leaf: true }
               , basefont: { leaf: true }
               , br: { leaf: true }
               , col: { leaf: true }
               , embed: { leaf: true }
               , img: { props: { alt: '' }, leaf: true }
               , input: { leaf: true }
               , link: { leaf: true }
               , meta: { leaf: true }
               , param: { leaf: true }
               , source: { leaf: true }
               , track: { leaf: true }
               , wbr: { leaf: true }
               };

  node.on('reduce', function ({ flow, struct }, callback) {
    switch (struct.type) {
    case 'empty': case 'html':
      debugger;
      return callback(null, struct);
    case 'html-unsafe':
      if (struct.html != null)
        return callback(null, { type: 'html', content: struct.html });
      else if (struct.altHtml != null)
        return callback(null, { type: 'html', content: struct.altHtml });
      else
        return callback(null, { type: 'empty' });
    case 'html-text':
      if (struct.text != null)
        return callback(null, { type: 'html', content: escape(struct.text) });
      else if (struct.altText != null)
        return callback(null, { type: 'html', content: escape(struct.altText) });
      else
        return callback(null, { type: 'empty' });
    case 'html-fragment':
      if (struct.children.length == 0) return callback(null, { type: 'empty' });
      return this.run(struct.children, flow, (err, result) => {
        if (err) return callback(err);
        debugger;
        var fragment = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i] === flow) continue ;
          switch (result[i].type) {
          case 'empty': break ;
          case 'html': fragment.push(result[i].content); break ;
          case 'text': fragment.push(escape(result[i].content)); break ;
          default : console.log('failed on', result[i]); break ;
          }
        }
        switch (fragment.length) {
        case 0: return callback(null, { type: 'empty' });
        case 1: callback(null, { type: 'html', content: fragment[0] });
        default: return callback(null, { type: 'html', content: fragment.join('') });
        }
      });
    case 'html-node':
      const construction = [];
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
      if (!config.leaf && struct.child) {
        construction.push('>');
        return this.run(struct.child, flow, (err, child) => {
          if (err) return callback(err);
          switch (child.type) {
          case 'empty': break ;
          case 'html': construction.push(child.content); break ;
          default: return callback('Unknown struct type: ' + child.type);
          }
          construction.push('</', struct.tag, '>');
          return callback(null, { type: 'html', content: construction.join('') });
        });
      }
      if (config.leaf) construction.push(' />');
      else construction.push('></', struct.tag, '>');
      return callback(null, { type: 'html', content: construction.join('') });
    default:
      logger.notice(struct);
      return callback(new Error('Unknown construction type'));
    }
  });

};
