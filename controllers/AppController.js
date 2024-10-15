import dbClient from './../utils/db';
import redisClient from '../utils/redis';
// const dbClient = require('../utils/db');
// import redisClient from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
           
    return res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  // GET /stats => Get number of users and files
  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
                                   
    return res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = AppController;
