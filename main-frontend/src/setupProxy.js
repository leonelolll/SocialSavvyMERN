const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/main-backend',
    createProxyMiddleware({
      target: 'http://localhost:4000', // Backend server URL
      changeOrigin: true,
    })
  );
};
