//sterownik do bazy danych
const { MongoClient } = require('mongodb');
//uri połaczenia do konkretnej bazy mongodb
const uri = "mongodb+srv://admin:x37zKvQmPixEfUOe@cluster0.qtyrl5o.mongodb.net/?retryWrites=true&w=majority";



async function connect() {
    const client =  new MongoClient(uri);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    } catch (e) {
        console.log("Error connecting to database: " + e);
        process.exit(1);
    }
}

async function getAllListings(client) {
    //pobieramy sobie wybraną kolekcję danych z bazy
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    //tworzymy listę (tablicę) danych za pomocą pustej kwerendy find
    let list = collection.find().toArray();
    return list;
}

function close(client) {
    client.close();
    console.log("Successfully disconnected from MongoDB");
}

module.exports = {connect, getAllListings, close}
