const api_key = 'key-abb46b51434b4bf37a24b3f7951c1961';
const domain = 'sandbox33daa43012d24105a1f7ae62fe53e71d.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = mailgun
