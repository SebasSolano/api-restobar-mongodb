import sharp from "sharp";
import fs from "fs";
import { ImageModel } from "../models/image.model.ts";

export class ImageService {
  /**
   * @description guarda una imagen en el sistema de archivos.
   * @param imageBuffer el buffer de la imagen a guardar.
   * @param originalName el nombre original del archivo de imagen.
   * @returns la ruta de acceso donde se guardo la imagen.
   */
  static async saveImage(
    imageBuffer: Buffer,
    originalName: string
  ): Promise<string> {
    const uploadDir = "uploads";
    const outputPath = `${uploadDir}/${Date.now()}-${originalName.replace(
      /\.[^/.]+$/,
      ""
    )}.png`;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await sharp(imageBuffer).png().toFile(outputPath);

    return outputPath;
  }

  /**
   * @description guarda la informacion de la imagen en la base de datos.
   * @param name el nombre de la imagen.
   * @param url la URL donde se encuentra la imagen.
   * @returns rl objeto de imagen guardado.
   */
  static async saveImageToDB(name: string, url: string) {
    const currentDate = new Date();
    const image = new ImageModel({ name, url, uploadDate: currentDate });
    await image.save();
    return image;
  }
  /**
   * @description obtiene imagenes subidas entre dos fechas.
   * @param start la fecha de inicio.
   * @param end la fecha de fin.
   * @returns una lista de imagenes subidas entre las fechas especificadas.
   */
  static async getImageBetweenDates(start: Date, end: Date) {
    return await ImageModel.find({
      uploadDate: { $gte: start, $lte: end },
    });
  }
  /**
   * @description cuenta el numero de imagenes subidas por hora.
   * @returns una lista con el conteo de imagenes agrupadas por hora.
   */
  static async countImagesByHour() {
    return await ImageModel.aggregate([
      {
        $group: {
          _id: {
            $hour: "$uploadDate",
          },
          count: { $sum: 1 },
        },
      },
    ]);
  }
}
