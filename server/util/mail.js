/**
 * Created by toma on 20.10.16..
 */
const config = require('../config');
const mailgun = require('mailgun-js')(config.mailgun.options);

function sendReset (token, email) {
  let data = {
    from: `Oodles <no-reply@${config.server.host}>`,
    to: email,
    subject: 'Password reset',
    text: `Please use the following link to reset your password: http://${config.server.host}:${config.server.port}/#/password/new?token=` +
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