import knex from "knex";
import knexConfig from "../../../knexfile.js";

// dung chung config voi knexfile de app va CLI migrate khong bi lech nhau
export default knex(knexConfig[process.env.NODE_ENV || "development"]);
