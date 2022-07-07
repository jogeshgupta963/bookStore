const mongoose = require('mongoose')

function connect(url) {
  return mongoose.connect(url, { useNewUrlParser: true })
}

module.exports = {
  connect,
}
