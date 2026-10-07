import knex from "knex";

export default knex({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  extra: {
    min: 2,
    max: 10,
  },
});
