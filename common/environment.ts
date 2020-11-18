export const environment = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  db: {
    url:
      process.env.DB_URL ||
      "mongodb+srv://morsch:905304@cluster0.rf0vi.mongodb.net/meat-api?retryWrites=true&w=majority",
  },
};
