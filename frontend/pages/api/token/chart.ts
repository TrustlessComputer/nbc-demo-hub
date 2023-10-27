import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_URL } from "utils";

// Types
type ChartData = { timestamp: Date; "Price (USD)": number }[];
type CachedData = { lastChecked: Date; chart: ChartData; supply: number };

function processTrades(trades: any[],address:string): CachedData {
  let supply: number = 0,
    data: ChartData = [];

  // Take remaining, new trades
  for (const trade of trades) {
    // Add new plot data
    data.push({
      timestamp: new Date(trade.trade_time),
      "Price (USD)": Number(trade.price_usd),
    });
  }
  return {
    lastChecked: new Date(),
    chart: data,
    supply,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Collect token address
  let { address } = req.query;
  if (!address) return res.status(400).json({ error: "Missing token address" });
  if (Array.isArray(address)) address = address[0];
  address = address.toLowerCase();

  try {

    let processed: CachedData;

    let { data } = await axios.get( API_URL +"/player-share/chart/data?day=15&address="+address)
    if (data&&data["result"]!="") {
      // Process trades
       processed = processTrades(data["result"],address);
    }

    // Return new data
    return res.status(200).json(processed.chart);
  } catch (e: unknown) {
    // Catch errors
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }

    // Return default error
    return res.status(500).json({ message: "Internal server error" });
  }
}
