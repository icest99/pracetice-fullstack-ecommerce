import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId('63da4fbcd9747eef4d1f9de2'),
    },
  },
  {
    $group: {
      _id: '$product',
      averageRating: {
        $avg: '$rating',
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];

const client = await MongoClient.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const coll = client.db('ECOM-API').collection('reviews');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
