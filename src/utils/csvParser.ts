import fs from "fs";
import path from "path";
import csv from "csv-parser";
import * as turf from "@turf/turf"
import geolocation from "geolocation"

const results: any[] = [];

const csvFilePath = path.join(__dirname, "../../data/indian_food.csv");
const GeoJsonPath = path.join(__dirname, "../../data/Indian_States.json")



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


export const getStatesData = async(stateName: string, location: number[])=>{ 
  const GeoJsonStates = JSON.parse(fs.readFileSync(GeoJsonPath, 'utf-8'));
  const userState =await GeoJsonStates?.features?.find((state) =>state.properties.NAME_1.toLowerCase() == stateName.toLowerCase());

  const  centroid = turf.centroid(userState);
  const currentPoint = turf.point(location);
  const distance = turf.distance(currentPoint, centroid, { units: 'kilometers' });
  return {
    centroid: centroid.geometry.coordinates,
    distance
  }
}