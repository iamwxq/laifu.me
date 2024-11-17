module.exports = {
<<<<<<< HEAD
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
=======
  apps: [{
    name: "laifu",
    script: "pnpm run start",
  }],
};
>>>>>>> 39a0c874e05b0d91055221ba461cb818f8d240b7
