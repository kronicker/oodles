/**
 * Created by toma on 20.10.16..
 */
const mailgunConfig = require('../config').mailgun;
const mailgun = require('mailgun-js')(mailgunConfig.options);

function sendReset (token, email) {
  let data = {
    from: 'Oodles <no-reply@' + mailgunConfig.domain + '>',
    to: email,
    subject: 'Password reset',
    text: 'Please use the following link to reset your password: http://localhost:3000/#/password/new?token=' +
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