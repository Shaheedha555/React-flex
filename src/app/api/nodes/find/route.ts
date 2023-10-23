// pages/api/nodes/find.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const database = await connectToDatabase();
    const nodes = await database.collection("nodes").find().toArray();
    console.log(nodes);

    return NextResponse.json(nodes);
  } catch (error) {
    console.error("Error fetching nodes:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
