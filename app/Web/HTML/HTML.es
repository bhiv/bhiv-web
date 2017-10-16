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
      return callback(null, struct);
    case 'html-unsafe':
      if (struct.html != null)
        return this.run(struct.html, flow, (err, html) => {
          if (err) return callback(err);
          if (html == null) html = struct.altHtml;
          return callback(null, { type: 'html', content: html });
        });
      else if (struct.altHtml != null)
        return callback(null, { type: 'html', content: struct.altHtml });
      else
        return callback(null, { type: 'empty' });
    case 'html-text':
      if (struct.text != null)
        return this.run(struct.text, flow, (err, text) => {
          if (err) return callback(err);
          if (text == null) text = struct.altText;
          return callback(null, { type: 'html', content: escape(text) });
        });
      else if (struct.altText != null)
        return callback(null, { type: 'html', content: escape(struct.altText) });
      else
        return callback(null, { type: 'empty' });
    case 'html-fragment':
      if (struct.children.length == 0) return callback(null, { type: 'empty' });
      return this.run(struct.children, flow, (err, result) => {
        if (err) return callback(err);
        var fragment = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i] === flow) continue ;
          if (result[i] == null) debugger;
          switch (result[i].type) {
          case 'empty': break ;
          case 'html': fragment.push(result[i].content); break ;
          case 'text': fragment.push(escape(result[i].content)); break ;
          default : console.log('failed on', result[i]); break ;
          }
        }
        switch (fragment.length) {
        case 0: return callback(null, { type: 'empty' });
        case 1: return callback(null, { type: 'html', content: fragment[0] });
        default: return callback(null, { type: 'html', content: fragment.join('') });
        }
      });
    case 'html-node':
      const config = tags[struct.tag] || {};
      const toResolve = {};
      if (struct.props != null) toResolve.props = struct.props;
      if (!config.leaf) toResolve.child = struct.child;
      return this.run(toResolve, flow, (err, { props, child }) => {
        if (err) return callback(err);
        const construction = [];
        construction.push('<', struct.tag);
        for (let prop in props) {
          construction.push(' ', prop);
          if (props[prop] == null) continue ;
          construction.push('="', escape(props[prop]), '"');
        }
        for (let prop in struct.defProps) {
          if (props && prop in props) continue ;
          construction.push(' ', prop);
          if (struct.defProps[prop] == null) continue ;
          construction.push('="', escape(struct.defProps[prop]), '"');
        }
        for (let prop in config.props) {
          if (props && prop in props) continue ;
          if (struct.defProps && prop in struct.defProps) continue ;
          construction.push(' ', prop);
          if (config.props[prop] == null) continue ;
          construction.push('="', escape(props[prop]), '"');
        }
        if (config.leaf) {
          construction.push(' />');
        } else {
          construction.push('>');
          if (child != null) {
            switch (child.type) {
            case 'empty': break ;
            case 'html': construction.push(child.content); break ;
            default: return callback('Unknown struct type: ' + child.type);
            }
          }
          construction.push('</', struct.tag, '>');
        }
        return callback(null, { type: 'html', content: construction.join('') });
      });
    default:
      logger.notice(struct);
      return callback(new Error('Unknown construction type'));
    }
  });

};
