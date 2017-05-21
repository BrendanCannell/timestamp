const http = require('http');
const url  = require('url');

const server = http.createServer(function (req, res) {
    const input = decodeURIComponent(url.parse(req.url).pathname).slice(1);
    const inputIsUnixTime = input.match(/^\d*$/);

    var inputDate;
    if (inputIsUnixTime) {
	const parsed = Number.parseInt(input);

	if (!Number.isNaN(parsed)) {
	    inputDate = new Date(parsed * 1000);
	}
    } else {
	inputDate = new Date(input);
    }

    const output = (inputDate && (inputDate.toDateString() != "Invalid Date")) ? {
	unix:    Math.floor(inputDate.getTime() / 1000),
	natural: inputIsUnixTime ? inputDate.toDateString() : input
    } : {
	unix:    null,
	natural: null
    };
    
    res.end(JSON.stringify(output));
});

server.listen(process.env.PORT);
