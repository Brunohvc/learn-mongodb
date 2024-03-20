
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_NAME_DATABASE;
console.log('Connecting to MongoDB...', uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     console.log("GET DATABASE");
//     const database = client.db('sample_mflix');
//     console.log("GET COLLECTION");
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     console.log("GET MOVIE");
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const save = (collection, data) => {
  console.log("SAVE DATA");
  if (data._id) {
    return client.db(databaseName).collection(collection).updateOne({ _id: id }, { $set: data });
  }
  return client.db(databaseName).collection(collection).insertOne(data);
}

const getById = (collection, id) => {
  console.log("GET BY ID");
  return client.db(databaseName).collection(collection).findOne({ _id: id });
}

const get = (collection, query) => {
  console.log("GET");
  return client.db(databaseName).collection(collection).find(query).toArray();
}

const remove = (collection, id) => {
  console.log("REMOVE");
  return client.db(databaseName).collection(collection).deleteOne({ _id: id });
}

module.exports = {
  save,
  getById,
  get,
  remove
}
