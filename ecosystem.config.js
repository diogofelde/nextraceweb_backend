module.exports = {
  apps: [{
    name: 'nextrace-backend',
    script: 'server.cjs',
    watch: true,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
