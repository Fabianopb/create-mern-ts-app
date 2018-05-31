import { Request, Response } from "express";

export let index = (req: Request, res: Response) => {
  res.json({
    message: "The backend is running!"
  });
};
