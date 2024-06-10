import express from "express";
import dishRoutes from "@routes/dishRoutes";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5600;
app.use(cors());
app.use(express.json());
app.use("/api", dishRoutes);

app
  .listen(port, () => {
    console.log(`
    ################################################
            Server running on port ${port}
    ################################################
    `);
  })
  .on("error", (error) => {
    console.error(error);
    throw error;
  });

process.on("unhandledRejection", (error, promise) => {
  console.error("unhandledRejection", promise);
  console.error("The error was:", error);
  process.exit(1);
});
