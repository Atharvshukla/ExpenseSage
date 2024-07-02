const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["https://expensesage.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
try {
  const routesPath = './routes';
  console.log(`Reading routes from ${routesPath}`);
  const routes = readdirSync(routesPath);
  console.log('Routes found:', routes);

  routes.forEach((route) => {
    const routePath = `${routesPath}/${route}`;
    console.log(`Loading route: ${routePath}`);
    app.use('/api/v1', require(routePath));
  });
} catch (err) {
  console.error('Error loading routes:', err);
}

// Server Initialization
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
