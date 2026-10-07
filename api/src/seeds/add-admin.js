import bcrypt from "bcryptjs";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  
  await knex("roles").del();
  await knex("user_roles").del();
  await knex("app_functions").del();
  await knex("role_permissions").del();
  await knex("refresh_tokens").del();
  await knex("users").del();

  await knex("users").insert([
    {
      id:'f2f9c2c4-4c7a-11ec-bf7b-0242ac120002',
      username: "admin",
      email: "admin@localhost.com",
      full_name: "Admin",
      password_hash: await bcrypt.hash("admin", 10),
      is_locked: false,
      created_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      updated_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("roles").insert([
    {
      id: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      code: "ADM",
      name_vi: "admin",
      name_en: "admin",
      created_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      updated_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("user_roles").insert([
    {
      user_id: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      role_id: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
      assigned_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",     
      assigned_at: new Date(),

    },
  ]);

  await knex("app_functions").insert([
    {
      code: "SYS.USER_ROLE",
      module: "USER_ROLE",
      name_vi: "Admin",
      name_en: "Admin",
      supported_actions: ["VIEW", "CREATE", "EDIT", "DELETE"]
    },
  ]);

  await knex("role_permissions").insert([{
    role_id: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
    function_code: "SYS.USER_ROLE",
    action: "CREATE",
    created_by: "f2f9c2c4-4c7a-11ec-bf7b-0242ac120002",
    created_at: new Date()
  }])
};
