/**
 * Created by toma on 20.10.16..
 */
const config = require('../config');
const mailgun = require('mailgun-js')(config.mailgun.options);
const oodlerUtil = require('./oodler');
const templates = require('./mailTemplates');

const fromMail = `Oodles <no-reply@${config.server.host}>`

function sendReset (token, email) {
  let data = {
    from: fromMail,
    to: email,
    subject: 'Password reset',
    html: templates.resetPassword(config.server.host, config.server.port, token)
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
    html: templates.dueDate(config.server.host, config.server.port, dueDate)
  };

  console.log(data);

  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

function sendThingySuggestion (suggestedThingy) {
  oodlerUtil.getAdmins()
    .then(admins => {
      for(let admin of admins) {
        let data = {
          from: fromMail,
          to: admin.email,
          subject: 'New thingy suggestion',
          html: templates.thingySuggestion(config.server.host, config.server.port, suggestedThingy)
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
    html: templates.thingyApproval(config.server.host, config.server.port, thingyName, admin)
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
    html: templates.thingyRejection(config.server.host, config.server.port, thingyName, admin)
  };
  
  console.log(data);
  
  mailgun.messages().send(data, (err, body) => {
    if(err) throw err;
  });
}

module.exports = {
  sendReset,
  sendDueDate,
  sendThingySuggestion,
  sendThingyApproval,
  sendThingyRejection
};
