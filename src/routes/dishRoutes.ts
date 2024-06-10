import { Router } from "express";
import {
  getAllDishes,
  getDishByName,
  getDishesByIngredients,
} from "@controllers/dishController";

const router = Router();

router.get("/dishes", getAllDishes);
router.post("/dishes/:name", getDishByName);
router.get("/dishByIngredient", getDishesByIngredients);

export default router;
