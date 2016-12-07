var nodemailer = require('nodemailer');

module.exports = function(obj) {
  var transporter = nodemailer.createTransport(`smtps://${obj.username}%40gmail.com:${obj.password}@smtp.gmail.com`);

  var mailOptions = {
      from: `<${obj.from}>`, // sender address
      to: obj.to, // list of receivers
      subject: 'Hello, your site gone down ✔', // Subject line
      text: `Hello, your site gone down ✔ ${obj.site.name} ${obj.site.url}`,
      html: `<h1>Hello, your site gone down ✔ ${obj.site.name} ${obj.site.url}</h1>` // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

}
