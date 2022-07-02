import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import redis from "../lib/cache";

const prisma = new PrismaClient()
export default class UserController {
  static async find(req: Request, res: Response){
    try {
      const cacheKey = "users:all"
      const cachedUsers = await redis.get(cacheKey)

      if (cachedUsers) {
        return res.json(JSON.parse(cachedUsers))
      }

      console.time("find Users")
      const users = await prisma.user.findMany()
      console.timeEnd("find Users")
      await redis.set(cacheKey, JSON.stringify(users))
      return res.json(users)
    } catch (error) {
      console.error(error)
      return res.json({
        error
      })
    }
  }
}