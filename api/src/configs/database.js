import knex from "knex";

export default knex({
  client: "postgresql",
  connection: {
    database: "erp",
    user: "username",
    password: "password",
  },
  extra: {
    min: 2,
    max: 10,
  },
});
