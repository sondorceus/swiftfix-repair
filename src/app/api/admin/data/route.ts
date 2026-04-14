import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "bookings.json");

function ensureDataDir() {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    const { mkdirSync } = require("fs");
    mkdirSync(dir, { recursive: true });
  }
}

function readData() {
  ensureDataDir();
  if (!existsSync(DATA_FILE)) {
    return { bookings: [], blockedSlots: {} };
  }
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf8"));
  } catch {
    return { bookings: [], blockedSlots: {} };
  }
}

function writeData(data: Record<string, unknown>) {
  ensureDataDir();
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = readData();

  if (body.blockedSlots !== undefined) {
    data.blockedSlots = body.blockedSlots;
  }

  if (body.booking) {
    data.bookings = data.bookings || [];
    data.bookings.push(body.booking);
  }

  writeData(data);
  return NextResponse.json({ ok: true });
}
