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
    });
    // this.client.on('connect', () => {
    // this.connected = true;
    // });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    // return new Promise((resolve, reject) => {
    // this.client.get(key, (err, value) => {
    // if (err) {
    // return reject(err);
    // }
    // return resolve(value);
    // });
    // });
    return await this.client.get(key);
  }

  async set(key, value, duration) {
    // return new Promise((resolve, reject) => {
    // this.client.set(key, value, 'EX', duration, (err) => {
    // if (err) {
    // return reject(err);
    // }
    // return resolve();
    // });
    // });
    return await this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    // return new Promise((resolve, reject) => {
    // this.client.del(key, (err) => {
    // if (err) {
    // return reject(err);
    // }
    // return resolve();
    // });
    // });
    return await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
