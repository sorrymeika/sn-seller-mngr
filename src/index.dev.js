
require('./sass/style.dev.scss');
require('nuclear');

const { env } = require("snowball");
const { Server } = require('sn-cornerstone');
const { createApplication } = require("snowball/app");
const router = require("./app/router");

const sellerServer = new Server({
    baseUrl: '/seller_server'
});

createApplication({
    routes: router.default,
    autoStart: true,
    extend() {
        return {
            env: {
                ...env,
                IMAGE_UPLOAD_URL: process.env.REACT_APP_IMAGE_UPLOAD_URL,
                SFS_URL: process.env.REACT_APP_SFS_URL
            },
            server: {
                seller: sellerServer
            }
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
