const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// method to send the verification mail when someone wants to subscribe
exports.verificationMail = function (reciever, id) {
  const html = `
  <a href="http://127.0.0.1:3000/api/v1/verify/${id}">click here to verify </a>
  `;
  const verificationMsg = {
    to: reciever,
    from: "kannudivyamextra2@gmail.com",
    subject: "Pleasy verify your email ID",
    text: "this is text field",
    html: html,
  };
  sgMail.send(verificationMsg);
};

// method to send newsletter to all the verified subscribers
exports.sendToAll = function (recievers) {
  const msg = {
    to: recievers,
    from: "kannudivyamextra2@gmail.com",
    subject: "newsletter",
    text: "Random newsletter",
    html: "<h1>Topic header</h1>",
  };
  sgMail.sendMultiple(msg);
};
