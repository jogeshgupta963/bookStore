const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config()
const app = express()
const { connect } = require('./database/db')
const cors = require('cors')

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: require('./Schema/schema'),
    graphiql: process.env.NODE_ENV === 'development' || true,
  }),
)
let port = process.env.PORT || 3000

;(async function () {
  try {
    connect(process.env.MONGO_URI)
    console.log('DB CONNECTED')
    app.listen(port, () => {
      console.log(`Server is running on ${process.env.port} `)
    })
  } catch (err) {
    console.log(err)
  }
})()
