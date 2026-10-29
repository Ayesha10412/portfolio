export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'localhost',
    port: Number(process.env.PORT ?? 3000),
    frontendOrigin:
      process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  },
});
