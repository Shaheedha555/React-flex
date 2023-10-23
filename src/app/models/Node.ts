import { ObjectId } from "mongodb";

export interface Node {
  id?: string; // MongoDB ObjectId
  _id: ObjectId;
  type: string;
  position: {
    x: number;
    y: number;
  };
  // Add other properties as needed
}
