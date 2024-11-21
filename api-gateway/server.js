const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Menggunakan CORS dengan opsi default
app.use(cors({
    origin: 'http://localhost:8000', // Sesuaikan dengan asal yang diizinkan
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200 // response status 200 pada permintaan OPTIONS
}));

// Middleware untuk logging setelah CORS
app.use((req, res, next) => {
    next(); // Lanjutkan ke middleware berikutnya
});

// Proxy request ke dokumen-service
app.use('/dokumen/*', createProxyMiddleware({
    target: 'http://dokumen-service:8081',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/dokumen/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy request ke informasi-service
app.use('/informasi/*', createProxyMiddleware({
    target: 'http://informasi-service:8082',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/informasi/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy request ke kegiatan-service
app.use('/kegiatan/*', createProxyMiddleware({
    target: 'http://kegiatan-service:8083',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/kegiatan/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy request ke user-service
app.use('/user/*', createProxyMiddleware({
    target: 'http://user-service:8084',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/user/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy request ke weeklytimeline-service
app.use('/weeklytimeline/*', createProxyMiddleware({
    target: 'http://weeklytimeline-service:8085',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/weeklytimeline/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

// Proxy request ke project-service
app.use('/project/*', createProxyMiddleware({
    target: 'http://project-service:8086',
    changeOrigin: true,
    pathRewrite: function (path, req) {
        return path.replace(/^\/project/, '');
    },
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    }
}));

app.listen(5000, () => {
  console.log('API Gateway running on http://localhost:5000');
});
