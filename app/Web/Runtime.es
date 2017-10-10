/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('http-get')
    .as({ type: 'file', filepath: '%:~{Web:runtime.js}' })
    .end();

};
