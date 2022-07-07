exports.handler = async function (event, context) {
    const {Client} = require('pg')
    const client = new Client({
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
    await client.connect();

    const data = await client.query("SELECT * FROM users")
    const rows = await data.rows

    client.end();
    return JSON.stringify({"rows": rows})
}

