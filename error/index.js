const http = require('http');

function HttpError(status, message) {
    Error.apply(this, arguments);
    this.name = HttpError;

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

exports.HttpError = HttpError;