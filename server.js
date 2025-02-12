const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/send-pdf", (req, res) => {
  const { email, username } = req.body;

  // Configure your email transport using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your ML Roadmap PDF",
    text: `Hi ${username},\n\nPlease find attached your ML roadmap PDF.\n\nBest regards,\nYour Company`,
    attachments: [
      {
        filename: "ML_Roadmap.pdf",
        path: "./path/to/ML_Roadmap.pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
