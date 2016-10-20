/**
 * Created by toma on 20.10.16..
 */
const config = {
  apiKey: 'key-73db2b70c2c5fda574df5e2fd938504f',
  domain: 'sandbox629530a6164643d28eb2f1767607d8db.mailgun.org'
};
const mailgun = require('mailgun-js')(config);

function sendReset (token, email) {
  let data = {
    from: 'Oodles <no-reply@oodles.extensionengine.com>',
    to: email,
    subject: 'Password reset',
    text: 'Please use the following link to reset your password: localhost:3000/#/password/new?token=' +
    token.value +
    ' .\nIf you did not request this password change please feel free to ignore it.' +
    '\nOodles'
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

module.exports = {
  sendReset
};