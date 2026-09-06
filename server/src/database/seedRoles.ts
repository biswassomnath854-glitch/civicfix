import sequelize from "../config/database";
import { Role } from "../models";

const seedRoles = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ Database connected");

    const roles = [
      {
        name: "Citizen",
        description: "Reports and tracks civic issues"
      },
      {
        name: "Officer",
        description: "Handles and resolves assigned civic issues"
      },
      {
        name: "Admin",
        description: "Manages the CivicFix platform"
      }
    ];

    for (const role of roles) {
      await Role.findOrCreate({
        where: {
          name: role.name
        },
        defaults: role
      });
    }

    console.log("✅ CivicFix roles seeded successfully");

    await sequelize.close();
  } catch (error) {
    console.error("❌ Role seeding failed:", error);
    process.exit(1);
  }
};

seedRoles();