const functions = require('firebase-functions');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'server', '.env') });

const app = require('../server/app');

exports.api = functions.https.onRequest(app);
