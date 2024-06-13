import { Router } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as AuthorService from "./author.service";

export const authorRouter = Router();

// GET: list of all authors
authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (error: unknown) {
    console.error("Error from authorRouter.get", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET: Retrieve a single author by ID
authorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const author = await AuthorService.getAuthor(req.params.id);
    return res.status(200).json(author);
  } catch (error: unknown) {
    console.error("Error from authorRouter.get", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
