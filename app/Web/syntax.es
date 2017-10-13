export default new function () {
  const HTML = this;

  const reduce = function (struct) {
    return { $: 'Web.HTML:reduce', _: { flow: '$:@', struct } };
  };

  this.empty = function () {
    return this.$push({ type: 'empty' });
  };

  this.html = function (html, altHtml) {
    Bhiv.Assert.hasOneString([html, altHtml], 'Some html is required');
    const struct = { type: 'html-unsafe' };
    if (html != null) struct.html = html;
    if (altHtml != null) struct.altHtml = { __: altHtml };
    return this.$push(reduce(struct));
  };

  this.text = function (text, altText) {
    Bhiv.Assert.hasOneString([text, altText], 'Some text is required');
    const struct = { type: 'html-text' };
    if (text != null) struct.text = text;
    if (altText != null) struct.altText = { __: altText };
    return this.$push(reduce(struct));
  };

  this.tag = function (tag, props, defProps) {
    Bhiv.Assert.isString(tag, 'Tag name is required');
    const struct = { type: 'html-node' };
    if (props != null) struct.props = props;
    if (defProps != null) struct.defProps = { __: defProps };
    return this.$push(reduce(struct));
  };

  this.Fragment = function () {
    return new Bhiv.AST.Chain(this, function () {
      switch (this.$chain.length) {
      case 0:
        return this.$parent.$push({ type: 'empty' });
      case 1:
        return this.$parent.$push(this.$chain[0]);
      default:
        const struct = { type: 'html-fragment', children: this.$chain };
        return this.$parent.$push(reduce(struct));
      }
    });
  };

  this.Tag = function (tag, props, defProps) {
    Bhiv.Assert.isString(tag, 'Tag name is required');
    return new Bhiv.AST.Chain(this, function () {
      const struct = { type: 'html-node', tag };
      if (props != null) struct.props = props;
      if (defProps != null) struct.defProps = defProps;
      switch (this.$chain.length) {
      case 0: break ;
      case 1: struct.child = this.$chain[0]; break ;
      default:
        const child = { type: 'html-fragment', children: this.$chain };
        struct.child = reduce(child);
        break ;
      }
      return this.$parent.$push(reduce(struct));
    });
  };

  this.Block = function () {
    const args = arguments;
    return new Bhiv.AST.Chain(this, function () {
      const block = this.$parent.Block.apply(this.$parent, args);
      if (this.$chain.length > 0) {
        const fragment = HTML.Fragment.call(block);
        fragment.$chain = this.$chain;
        fragment.end();
      } else {
        HTML.empty.call(block);
      }
      return block.end.apply(block, arguments);
    });
  };

};
