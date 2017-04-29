module.exports = {
  subscribeUser
};

const request = require('request');
const env = process.env;

function subscribeUser(email, callback) {
  // Add user to Sheep Tag Subscribers
  addUserToList(email, env.SHEEP_TAG_LIST_ID);

  // Add user to Luna Wolf Newsletter
  addUserToList(email, env.NEWSLETTER_LIST_ID);

  callback(true);
}

function addUserToList(email, listID) {
  // Set URL for the list
  // You need to check where your api key is located, for example if your api key ends with 'us6',
  // you need to replace the us11 in the url below with your corresponding server location. This is found on
  // MailChimp with your API keys.
  var url = `https://us11.api.mailchimp.com/3.0/lists/${listID}/members`;

  // Build and run the request
  request(
    {
      method: 'POST',
      uri: url,
      headers: {
        'Authorization' : `apikey ${env.MAILCHIMP_API_KEY}`
      },
      json: true,
      body: {
        'email_address': email,
        'status': 'subscribed'
      }
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(response.statusCode);
        console.log(body);
      }
    }
  );
}
