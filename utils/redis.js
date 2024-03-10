/**
 * contains the class RedisClient
 */
import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Represents a new instance of RedisClient
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.log(`Redis client failed to connect: ${err.message || err.toString()}`);
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} _stringKey The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(_stringKey) {
    return promisify(this.client.GET)
      .bind(this.client)(_stringKey);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} _stringKey The key of the item to store.
   * @param {String | Number | Boolean} _value The item to store.
   * @param {Number} _duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(_stringKey, _value, _duration) {
    promisify(this.client.SETEX)
      .bind(this.client)(_stringKey, _duration, _value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} _stringKey The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(_stringKey) {
    promisify(this.client.DEL)
      .bind(this.client)(_stringKey);
  }
}

const redisClient = new RedisClient();
export default redisClient;
