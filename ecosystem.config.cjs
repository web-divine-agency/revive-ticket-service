module.exports = {
  apps: [
    {
      name: "02-TicketService",
      namespace: "revive-ticket-service",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
