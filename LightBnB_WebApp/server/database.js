const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

//connect to lightbnb database
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT * FROM users
  WHERE email = $1`,
      [email]
    )
    .then((result) => {
      if (result.rows[0]) return result.rows[0];
      else return null;
    })
    .catch((err) => console.log(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT * FROM users
  WHERE email = $1`,
      [id]
    )
    .then((result) => {
      if (result.rows[0]) return result.rows[0];
      else return null;
    })
    .catch((err) => console.log(err.message));
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((error) => console.log(error.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
          FROM reservations
          JOIN properties ON properties.id = reservations.property_id
          JOIN property_reviews ON properties.id = reservations.property_id
          WHERE reservations.guest_id = $1
          GROUP BY reservations.id, properties.id
          LIMIT $2`,
      [guest_id, limit]
    )
    .then((result) => result.rows)
    .catch((error) => error.message);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // array to hold parameters that MAY be entered in the query
  const queryParams = [];

  const filters = [];

  //before the WHERE clause
  let queryString = `
SELECT properties.*, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    filters.push(`city LIKE $${queryParams.length}`);
  }

  // return owner's properties
  if (options.owner_id) {
    queryParams.push(`${owner_id}`);
    filters.push(`owner_id = $${queryParams.length}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    filters.push(`cost_per_night >= $${queryParams.length}/100`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    filters.push(`cost_per_night <= $${queryParams.length}/100`);
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    filters.push(`minimum_rating >= $${queryParams.length}`);
  }


  if (filters.length !== 0) {
    queryString += `WHERE ${filters[0]}`;

    if (filters.length > 1) {
      for (let i = 1; i < filters.length; i++) {
        queryString += `AND ${filters[i]}`;
      }
    }
  }

  // push the limit to the end of queryParams
  queryParams.push(limit);

  //after the WHERE 
  queryString += `
GROUP BY properties.id
ORDER BY cost_per_night
LIMIT $${queryParams.length};`;


  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((error) => error.message);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
