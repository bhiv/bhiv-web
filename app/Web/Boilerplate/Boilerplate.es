/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('default-page')
    .load('app/Web/syntax.es')
    .Fragment()
    .  html('$:doctype', '<!DOCTYPE html>\n')
    .  Tag('html', '$:html', { lang: 'en', dir: 'ltr' })
    .    Tag('head').HtmlBlock('head')
    .      Tag('title').text('$:title', 'Bhiv Web - Default Boilerplate').end()
    .      HtmlBlock('meta')
    .        tag('meta', null, { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' })
    .        tag('meta', null, { 'http-equiv': 'Content-Script-Type', content: 'text/javascript' })
    .        end()
    .      HtmlBlock('styles').end()
    .      HtmlBlock('scripts').end()
    .      end().end()
    .    Tag('body', '$:body')
    .      HtmlBlock('body').end()
    .      tag('script', { src: '/_web/runtime.js' })
    .      end()
    .    end()
    .  end()
    .end();

};
