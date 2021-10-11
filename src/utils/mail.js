const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// method to send the verification mail when someone wants to subscribe
exports.verificationMail = function (reciever, id) {
  const html = `
  <h2>Please verify to get daily updates and news feed </h2>
  <a href="http://127.0.0.1:3000/api/v1/verify/${id}">verify </a>
  `;
  const verificationMsg = {
    to: reciever,
    from: "kannudivyamextra2@gmail.com",
    subject: "Pleasy verify your email ID",
    text: "this is text field",
    html: html,
  };

  sgMail.send(verificationMsg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

// method to send newsletter to all the verified subscribers
exports.sendToAll = function (content, recievers) {
  const msg = {
    to: recievers,
    from: "kannudivyamextra2@gmail.com",
    subject: content.subject,
    text: "Random newsletter",
    html: content.body,
  };

  sgMail.sendMultiple(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
