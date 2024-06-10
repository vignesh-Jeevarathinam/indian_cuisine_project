import { Request, Response } from "express";
import { getStatesData, parseCSV } from "@utils/csvParser";
import { Dish } from "../types/dish";
import { log } from "console";

let dishes: Dish[] = [];

//parsed dishes
parseCSV().then((data) => {
  dishes = data as Dish[];
});

//fetch all dishes
export const getAllDishes = async (req: Request, res: Response) => {
  if (dishes.length > 0) {
    res.json(dishes);
  }
};

//fetch dishes by name
export const getDishByName = async (req: Request, res: Response) => {
  const name = req.params.name.toLowerCase();
  const {stateName, location} = req.body.geoData;

  const dish = dishes.find((d) => d.name.toLowerCase() === name);
  if (dish) {
    const statesData =await getStatesData(stateName,location);
    const result ={dish, statesData};    
    res.json(result);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
};

//fetch dishes by ingredients
export const getDishesByIngredients = (req: Request, res: Response) => {
  const ingredients = req.query.ingredients as string;
  const ingredientList = ingredients
    .split(",")
    .map((i) => i.trim().toLowerCase());
  const possibleDishes = dishes.filter((dish) =>
    ingredientList.every((ingredient) =>
      dish.ingredients.toLowerCase().includes(ingredient)
    )
  );
  res.json(possibleDishes);
};
