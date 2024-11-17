module.exports = {
  apps : [{
    name   : "laifu",
    script : "pnpm run start",
    env_production: {
      NODE_ENV: "production",
      ssl: {
        cert: "./cert.pem",
        key: "./key.pem"
      },
      http2: true
    }
  }]
}
