const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://raspberrypi.local:8000',
      changeOrigin: true,
    })
  );
};