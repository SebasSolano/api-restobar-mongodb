import express from "express";
type Request = express.Request;
type Response = express.Response;
import { ImageService } from "../services/image.service.ts";

export class ImageController {
  /**
   * @description sube una imagen al servidor.
   * @param req la solicitud HTTP que contiene la imagen y el nombre.
   * @param res la respuesta HTTP que se enviará al cliente.
   * @returns la imagen guardada en la base de datos.
   * @throws error si falta la imagen o el nombre, o si ocurre un error en el servidor.
   */
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

  /**
   * @description obtiene imagenes entre dos fechas.
   * @param req la solicitud HTTP que contiene las fechas de inicio y fin.
   * @returns una lista de imagenes entre las fechas especificadas.
   */
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

  /**
   * @description obtiene estadisticas de imagenes subidas por hora.
   * @returns estadisticas de imagenes subidas por hora.
   */
  async getImageStats(req: Request, res: Response) {
    try {
      const stats = await ImageService.countImagesByHour();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
