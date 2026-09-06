import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  roleId: number;
  phone?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "phone" | "isActive"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  public id!: number;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public roleId!: number;
  public phone?: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash"
    },

    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "role_id"
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active"
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true
  }
);

export default User;