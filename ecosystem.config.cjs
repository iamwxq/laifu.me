module.exports = {
  apps: [{
    name: "laifu",
    script: "pnpm run start",
    env_production: {
      http2: true,
      NODE_ENV: "production",
    },
  }],
};
