/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('empty-page')
    .load('app/Web/syntax.es')
    ._html('$:doctype', '<!DOCTYPE html>\n')
    ._Tag('html', '$:html', { lang: 'en', dir: 'ltr' })
    .  _Tag('head')
    .    Block('head')
    .      _Tag('title')._text('$:title', 'YoloJS Web Boilerplate').end()
    .      Block('meta')
    .        _tag('meta', null, { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' })
    .        _tag('meta', null, { 'http-equiv': 'Content-Script-Type', content: 'text/javascript' })
    .        end()
    .      end()
    .      Block('styles').end()
    .      Block('scripts')
    .        _tag('script', { src: '%://:&{Router.Web:port}/_web/runtime.js' })
    .        end()
    .    end()
    .  _Tag('body', '$:body')
    .    Block('body').end()
    .    end()
    .  end()
    ._toString()
    .end();

};
