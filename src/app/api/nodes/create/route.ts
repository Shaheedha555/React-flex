import { connectToDatabase } from "../../../../lib/db";
import { Node } from "../../../models/Node";
import { InsertManyResult, UpdateResult } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const database = await connectToDatabase();
    const data = await req.json();
    const newNode: Node[] = data;

    for (const node of newNode) {
      const existingNode = await database
        .collection("nodes")
        .findOne({ id: node.id });

      if (existingNode) {
        const updateResult: UpdateResult<Node> = await database
          .collection("nodes")
          .updateOne({ id: node.id }, { $set: node });

        console.log(
          `Updated node with id ${node.id}. Modified ${updateResult.modifiedCount} document(s).`
        );
      } else {
        const insertResult: InsertManyResult<Node> = await database
          .collection("nodes")
          .insertMany([node]);

        console.log(
          `Inserted new node with id ${node.id}. Inserted ${insertResult.insertedCount} document(s).`
        );
      }
    }

    return NextResponse.json("Inserted nodes successfully");
  } catch (error) {
    console.error("Error creating node:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
