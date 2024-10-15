const Mongo = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.connected = false;
    Mongo.MongoClient.connect(url, { useUnifiedTopology: true }, (error, db) => {
      if (error) {
        console.error('Error connecting to MongoDB:', error);
        this.connected = false;
      } else {
        this.db = db.db(database);
        this.connected = true;
      }
    });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
