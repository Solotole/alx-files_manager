const redis = require('redis');
// const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.connected = false;
    this.client = redis.createClient();
    // this.get = promisify(this.client.get).bind(this);
    // this.set = promisify(this.client.set).bind(this);
    // this.del = promisify(this.client.del).bind(this);
    this.client.on('error', (err) => {
      console.log('Redis client error:', err);
      this.connected = false;
    });
    // this.connected = true;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          return reject(err);
        }
        return resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
