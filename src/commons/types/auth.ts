import { User } from "@prisma/client";

export type AuthUser = User & {
  role?: {
    id: number;
    name: string;
  };
  teams: {
    id: number;
    name: string;
  }[];
  permissions?: string[];
} | null;