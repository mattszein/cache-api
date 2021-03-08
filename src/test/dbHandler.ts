import mongoose from 'mongoose';

/**
 * Connect to the database.
 */
export const connect = async (uri: string) => {
  await mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (err) { 
      console.error(err);
      return false
    }
  });
  console.log('database connected')
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.disconnect();
  console.log('database closed');
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({}, function(err, result){
      if(err) return console.log(err);
      console.log("cleaned up ", result.deletedCount, " records");
    });
    }
    console.log('database cleaned');
};
