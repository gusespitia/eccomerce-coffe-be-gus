module.exports = ({ env }) => ({
  connection: {
    client: 'postgres', // Especifica el cliente de PostgreSQL
    connection: {
      host: env('PGHOST'),
      port: env.int('PGPORT', 5432), // Asegúrate de que sea el puerto correcto
      database: env('PGDATABASE'),
      user: env('PGUSER'),
      password: env('PGPASSWORD'),
      ssl: env.bool('DATABASE_SSL', true), // Activa SSL si tu base lo requiere
    },
    debug: true, // Opcional: establece en `true` para ver consultas SQL en los logs
  },
});
