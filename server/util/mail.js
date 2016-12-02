/**
 * Created by toma on 20.10.16..
 */
const config = require('../config');
const mailgun = require('mailgun-js')(config.mailgun.options);
const resetMail = require('./resetMail');
const dueDateMail = require('./dueDateMail');

function sendReset (token, email) {
  let data = {
    from: `Oodles <no-reply@${config.server.host}>`,
    to: email,
    subject: 'Password reset',
    html: resetMail.resetMail(config.server.host, config.server.port, token)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendDueDate (email, dueDate) {
  let data = {
    from: `Oodles <no-reply@${config.server.host}>`,
    to: email,
    subject: 'New due date set',
    html: dueDateMail.dueDateMail(config.server.host, config.server.port, dueDate)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

module.exports = {
  sendReset,
  sendDueDate
};
