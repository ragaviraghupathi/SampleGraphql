const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ragaviraghu:ratzraghu6194@cluster0-bp3fh.mongodb.net/test?retryWrites=true&w=majority/testapp',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('db connected');
})
const app = express();

app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql:true
}));
app.listen(4000, () => (
    console.log('Server listening on port 4000') 
))