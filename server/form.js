const { ThrowString } = require("appsby");
const { AppsbyAPI } = require("appsby");
const nodemailer = require("nodemailer");

class Form extends AppsbyAPI {
  componentDidMount = async () => {};

  componentShouldAuthorize = async () => {
    return true;
  };

  validateAndSubmitEmail = async (data) => {
    console.log(data);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      isSecure: true,
      auth: {
        user: "from email",
        pass: "password",
      },
    });

    let email = `
          <b>You've received a form submission</b>
          <br />
          Name: ${data.name}
          <br />
          Email: ${data.emailAddress}
        `;

    let text = `
          You've received a form submission \r\n
          Name: ${data.name} \r\n
          Email: ${data.emailAddress} \r\n
        `;

    let message = {
      from: "from email",
      to: "recipient email",
      replyTo: data.emailAddress,
      subject: "Form Submission",
      text: text,
      html: email,
    };

    await transporter.sendMail(message);
    return true;
  };
}

exports.default = Form;
