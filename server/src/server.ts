import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import sequelize from "./config/database";

import "./models";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL database connected successfully");

    await sequelize.sync();

    console.log("✅ Database models synchronized successfully");

    app.listen(PORT, () => {
      console.log(
        `🚀 CivicFix server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "❌ Unable to connect to database:",
      error
    );

    process.exit(1);
  }
};

startServer();