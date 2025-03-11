module.exports = {
  apps: [
    {
      name: "ReviveTicketService",
      namespace: "revive-ticket-service",
      script: "./src/index.js",
      watch: ["./src", "./src/*.js"],
      output: "./logs/out.log",
      error: "./logs/error.log",
    },
  ],
};
