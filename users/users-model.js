const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
};

function find() {
  return db("users as u")
    .select("u.id", "u.username")
    .orderBy("u.id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
