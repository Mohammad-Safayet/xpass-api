import http from 'http';

import { expressApp } from './api';
import { PORT, ENV } from './config/config';

if (ENV === 'production') {
    // const privateKey = fs.readFileSync(
    //   '/etc/letsencrypt/live/anime-sales.com/privkey.pem',
    //   'utf8'
    // );
    // const certificate = fs.readFileSync(
    //   '/etc/letsencrypt/live/anime-sales.com/cert.pem',
    //   'utf8'
    // );
    // const ca = fs.readFileSync(
    //   '/etc/letsencrypt/live/anime-sales.com/chain.pem',
    //   'utf8'
    // );
    // const credentials = {
    //   key: privateKey,
    //   cert: certificate,
    //   ca,
    // };

    http.createServer(expressApp()).listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
    });

    http
        .createServer(function fn (req, res) {
            res.writeHead(301, {
                Location: `https://${req.headers.host}${req.url}`,
            });
            res.end();
        })
        .listen(80);
} else if (ENV === 'development') {
    console.log(`http dev server running on port ${PORT}`);
    
    expressApp().listen(PORT);
} else {
    expressApp().listen(9000);
}