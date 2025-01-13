import sharp from "sharp";
import { writeFile } from "fs/promises";
import { ImageModel } from "../models/image.model.ts";

export class ImageService {
  static async saveImage(
    imageBuffer: Buffer,
    originalName: string
  ): Promise<string> {
    const outputPath = `uploads/${Date.now()}-${originalName.replace(
      /\.[^/.]+$/,
      ""
    )}.png`;

    await sharp(imageBuffer).png().toFile(outputPath);

    return outputPath;
  }

  static async saveImageToDB(name: string, url: string) {
    const image = new ImageModel({ name, url });
    await image.save();
    return image;
  }

  static async getImageBetweenDates(start: Date, end: Date) {
    return await ImageModel.find({
      uploadDate: { $gte: start, $lte: end },
    });
  }

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
