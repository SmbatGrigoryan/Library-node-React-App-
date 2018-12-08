
const config = {
  production: {
    SECRET_KEY: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
    mongoURI: process.env.MONGO_URI
  },
  defaultDev: {
    SECRET_KEY: '*******************************',
    DATABASE: 'mongodb://localhost:27017/library', // todo remove later
    mongoURI: 'mongodb://*******************:***********@ds227674.mlab.com:27674/libraryapp'
  }
  
};

const configKeys = (env) => {
  return env ? config[env] : config.defaultDev
};

module.exports = configKeys;
