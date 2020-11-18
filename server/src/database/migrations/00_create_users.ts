import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable("users", table => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("surname").notNullable();
        table.string("avatar").defaultTo("");
        table.string("whatsapp").defaultTo("");
        table.string("bio").defaultTo("");
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("passwordResetToken").defaultTo("");
        table.date("passwordResetExpires").defaultTo("");
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("users");
}