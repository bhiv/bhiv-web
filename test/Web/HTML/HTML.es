/*!UroxGvT3uDMQCT1va20i43ZZSxo*/

export default function (node, logger) {

  node.on('test-html')
    .load('app/Web/syntax.es')
    .html('%:<div class="toto">${data}</div>')
    .end();

  node.on('test-fragment')
    .load('app/Web/syntax.es')
    .Fragment()
    .  html('<input />')
    .  html('<button />')
    .  end()
    .end();

  node.on('test-tag-block')
    .load('app/Web/syntax.es')
    .Fragment()
    .  Tag('h1').text('%:Hello ${user}').end()
    .  Tag('div')
    .    HtmlBlock('content').text('No content for you here').end()
    .    end()
    .  end()
    .end();

  node.set
  ( 'mocha.html-1'
  , { method: 'test-html', flow: { data: '<script>alert("xss");</script>' }
    , result: { type: 'html', content: '<div class="toto"><script>alert("xss");</script></div>' }
    }
  );

  node.set
  ( 'mocha.fragment-1'
  , { method: 'test-fragment', glue: '$:content', result: '<input /><button />' }
  );

  node.set
  ( 'mocha.tag-block-1'
  , { method: 'test-tag-block', flow: { user: 'Toto' }, glue: '$:content'
    , result: '<h1>Hello Toto</h1><div>No content for you here</div>'
    }
  );

/*  node.set
  ( 'mocha.tag-block-2'
  , { method: 'mocha.ta'
    , result: { type: 'html', content: '<input /><button />' }
    }
  );
*/
};
