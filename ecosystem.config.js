// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'ai-bff',
      script: './app.ts',
      instances: 1,
      exec_mode: 'cluster',
      interpreter: './node_modules/.bin/ts-node', // 使用本地 ts-node
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        TS_NODE_TRANSPILE_ONLY: 'true'
      },
      env_production: {
        NODE_ENV: 'production',
        TS_NODE_TRANSPILE_ONLY: 'true'
      },
      error_file: './logs/ai-bff-error.log',
      out_file: './logs/ai-bff-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
