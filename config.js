const env = process.env;

export default {
  port: env.port || 3000,
  host: env.host || 'localhost',
};
