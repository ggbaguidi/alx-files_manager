/**
 * contains the class DBClient
 */
import mongodb from 'mongodb';

/**
 * Represent a database client
 */
class DBClient {
  /**
   * Represents a new instance of DBClient
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new mongodb.MongoClient(`mongodb://${host}:${port}/${database}`, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the Mongo database is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').estimatedDocumentCount();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').estimatedDocumentCount();
  }
}

const dbClient = new DBClient();
export default dbClient;
