import { DrinksCategory } from "@interfaces/index";
import { nanoid } from "nanoid";

export const drinkCategoriesArray: DrinksCategory[] = [
  {
    drinkCategory: "Non alcoholic",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Whiskey",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Cognac",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Red wine",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Champagne",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Rum",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Irish cream",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "White wine",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Gin",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Sparkling wine",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Brandy",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Juice",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Tequila",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Vodka",
    drink_id: nanoid(4),
  },
  {
    drinkCategory: "Others",
    drink_id: nanoid(4),
  },
];

export const fileTypes = ["image/png", "image/jpeg", "image/jpg"];
