import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import bcrypt from "bcryptjs";

declare module "express-session" {
  interface SessionData {
    adminId?: number;
  }
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.adminId = admin.id;
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
}
