require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  port: process.env.PORT || 3000,
  prisma,
};
