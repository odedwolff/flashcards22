var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://google-translate20.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
    'x-rapidapi-key': 'bdd8d845abmsh96b4d9dd3ad6ca1p1904fajsnc2df457abfa4'
  },
  data: {
    text: 'The POST method has several advantages over GET: it is more secure because most of the request is hidden from the user; Suitable for big data operations.',
    tl: 'es',
    sl: 'en'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});