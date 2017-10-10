/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
export default function (node, logger) {

  node.on('http-script', function () {
    return { type: 'file', filepath: './runtime.js' };
  });
};
