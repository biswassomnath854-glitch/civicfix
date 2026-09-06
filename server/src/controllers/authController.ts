import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { Role, User } from "../models";
import {
  successResponse,
  errorResponse
} from "../utils/apiResponse";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      name,
      email,
      password,
      phone
    } = req.body;

    if (!name || !email || !password) {
      return errorResponse(
        res,
        400,
        "Name, email and password are required"
      );
    }

    if (password.length < 8) {
      return errorResponse(
        res,
        400,
        "Password must be at least 8 characters long"
      );
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const existingUser = await User.findOne({
      where: {
        email: normalizedEmail
      }
    });

    if (existingUser) {
      return errorResponse(
        res,
        409,
        "Email is already registered"
      );
    }

    const citizenRole = await Role.findOne({
      where: {
        name: "Citizen"
      }
    });

    if (!citizenRole) {
      return errorResponse(
        res,
        500,
        "Citizen role not found"
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      roleId: citizenRole.id,
      phone: phone?.trim() || undefined,
      isActive: true
    });

    return successResponse(
      res,
      201,
      "Citizen registered successfully",
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: citizenRole.name
      }
    );
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return errorResponse(
      res,
      500,
      "Internal server error"
    );
  }
};