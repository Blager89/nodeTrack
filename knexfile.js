module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'track-db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'track-db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'track-db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }


};

