/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('empty-page')
    .load('app/Web/web-syntax.es')
    ._html('$:doctype', '<!DOCTYPE html>\n')
    ._Tag('html', '$:html', { lang: 'en', dir: 'ltr' })
    .  _Tag('head')
    .    _Tag('title')._text('$:title', 'YoloJS Single Page').end()
    .    Block('meta')
    .      _tag('meta', null, { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' })
    .      _tag('meta', null, { 'http-equiv': 'Content-Script-Type', content: 'text/javascript' })
    .      end()
    .    Block('head').end()
    .    end()
    .  _Tag('body', '$:body')
    .    Block('body').end()
    .    end()
    .  end()
    ._toString()
    .end();

};
