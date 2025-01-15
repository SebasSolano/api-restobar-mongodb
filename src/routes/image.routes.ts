import { Router } from "express";
import { ImageController } from "../controllers/image.controller.ts";

const router = Router();
const imageController = new ImageController();

router.post("/upload", async (req, res) => {
  await imageController.uploadImage(req, res);
});

router.get("/images", async (req, res) => {
  await imageController.getImages(req, res);
});

router.get("/stats", async (req, res) => {
  await imageController.getImageStats(req, res);
});

router.delete("/images", async (req, res) => {
  await imageController.deleteAllImages(req, res);
});

export default router;
