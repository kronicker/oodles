/**
 * Created by toma on 20.10.16..
 */
const config = require('../config');
const mailgun = require('mailgun-js')(config.mailgun.options);
const Oodler = require('../models/oodler');
const templates = require('./mailTemplates');

const fromMail = `Oodles <no-reply@${config.server.host}>`;

function sendNewOodler (token, oodler) {
  let data = {
    from: fromMail,
    to: oodler.email,
    subject: 'Welcome to Oodles!',
    html: templates.newOodler(token, oodler)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendReset (token, email) {
  let data = {
    from: fromMail,
    to: email,
    subject: 'Password reset',
    html: templates.resetPassword(token)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendDueDate (email, dueDate) {
  let data = {
    from: fromMail,
    to: email,
    subject: 'New due date set',
    html: templates.dueDate(dueDate)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendThingySuggestion (suggestedThingy) {
  Oodler.getAdmins()
    .then(admins => {
      for(let admin of admins) {
        let data = {
          from: fromMail,
          to: admin.email,
          subject: 'New thingy suggestion',
          html: templates.thingySuggestion(suggestedThingy)
        };
        console.log(data);

        mailgun.messages().send(data, (err, body) => {
          if(err) throw err;
        });
      }
    });
}

function sendThingyApproval (email, thingyName, admin) {
  let data = {
    from: fromMail,
    to: email,
    subject: 'Suggestion approved',
    html: templates.thingyApproval(thingyName, admin)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendThingyRejection (email, thingyName, admin) {
  let data = {
    from: fromMail,
    to: email,
    subject: 'Suggestion rejected',
    html: templates.thingyRejection(thingyName, admin)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

module.exports = {
  sendNewOodler,
  sendReset,
  sendDueDate,
  sendThingySuggestion,
  sendThingyApproval,
  sendThingyRejection
};
