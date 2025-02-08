import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://@cluster0.64iqo.mongodb.net/food-del"
//     )
//     .then(() => console.log("DB Connected"))
//     .catch((error) => console.log(error));
// };
export const connectDB = async () => {
  await mongoose
    .connect(
      process.env.MONGODB_URL
    )
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));
};


