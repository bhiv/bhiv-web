export default new function () {

  this.html = function (html, altHtml) {
    const payload = { type: '=:html', html, altHtml: { __: altHtml } };
    return this.then('Web.HTML:append', { flow: '$:@', struct: payload });
  };

  this.text = function (text, altText) {
    const payload = { type: '=:text', text, altText: { __: altText } };
    return this.then('Web.HTML:append', { flow: '$:@', struct: payload });
  };

  this.Tag = function (tag, props, defProps) {
    return this._Waterfall(this, function () {
      const payload = { type: '=:node', tag, props, defProps: { __: defProps }, children: { __: this._ast } };
      return this._parent.then('Web.HTML:append', { flow: '$:@', struct: payload });
    });
  };

  this.tag = function (tag, props, defProps) {
    const payload = { type: '=:node', tag, props, defProps: { __: defProps } };
    return this.then('Web.HTML:append', { flow: '$:@', struct: payload });
  };

  this.toString = function () {
    return this.then('Web.HTML:serialize');
  };

};
