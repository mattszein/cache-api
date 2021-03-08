import mongoose from 'mongoose';

export default (db: string) => {
  
  const connect = () => {
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
    connect();
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};

