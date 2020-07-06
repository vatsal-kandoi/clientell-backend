const express = require('express');

const logger = require('./winston');
const mongoDB = require('./db');

module.exports = {
  app: express(),
  /**
     * @desc Loading express application
     */
  async load() {
    logger.info({message: 'Configuration options loaded'});

    await mongoDB();
    logger.info({message: 'Connected to the database'});
    if (this.app == undefined) {
      this.app = express();
    }
    logger.info({message: 'Initialised express application'});

    this.app = require('./middleware')(this.app);
    logger.info({message: 'Mounted middlewares to express application'});

    this.app.use(require('./routes'));
    logger.info({message: 'Mounted express routes'});
    
    return;
  },

  /**
     * @desc Starting express application
     */
  async run() {
    this.app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
      logger.info({message: `Running express application at ${process.env.PORT || 3000}`});
    });
  },
};
