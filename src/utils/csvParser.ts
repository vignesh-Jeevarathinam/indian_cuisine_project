import fs from "fs";
import path from "path";
import csv from "csv-parser";

const results: any[] = [];

const csvFilePath = path.join(__dirname, "../../data/indian_food.csv");

//parse the csv data push into the array because in array we can access data easily
export const parseCSV = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
