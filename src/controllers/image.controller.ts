import { Request, Response } from "express";
import { ImageService } from "../services/image.service.ts";

export class ImageController {
  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.body.image || !req.body.name) {
        return res.status(400).json("Image and name are required");
      }

      const imageBuffer = Buffer.from(req.body.image, "base64");

      const imageUrl = await ImageService.saveImage(imageBuffer, req.body.name);
      const savedImage = await ImageService.saveImageToDB(
        req.body.name,
        imageUrl
      );

      res.status(200).json(savedImage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImages(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const images = await ImageService.getImageBetweenDates(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImagesStats(req: Request, res: Response) {
    try {
      const stats = await ImageService.countImagesByHour();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
