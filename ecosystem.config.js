module.exports = {
  apps: [
    {
      name: 'Themis-bot',
      script: 'src\\index.js',
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      instances: 1,
      exec_mode: 'fork'
    }
  ]
};
