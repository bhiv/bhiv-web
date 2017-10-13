/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('default-page')
    .load('app/Web/syntax.es')
    ._Fragment()
    .  _html('$:doctype', '<!DOCTYPE html>\n')
    .  _Tag('html', '$:html', { lang: 'en', dir: 'ltr' })
    .    _Tag('head')
    .      _Block('head')
    .        _Tag('title')._text('$:title', 'Bhiv Web - Default Boilerplate').end()
    .        _Block('meta')
    .          _tag('meta', null, { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' })
    .          _tag('meta', null, { 'http-equiv': 'Content-Script-Type', content: 'text/javascript' })
    .          end()
    .        _Block('styles').end()
    .        _Block('scripts').end()
    .        end()
    .      end()
    .    _Tag('body', '$:body')
    .      _Block('body').end()
    .      _tag('script', { src: '/_web/runtime.js' })
    .      end()
    .    end()
    .  end()
    .end();

};
