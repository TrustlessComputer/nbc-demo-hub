import Card from "components/Card";
import { renderTimeSince } from "utils/time";
import TradeTable from "components/TradeTable";
import {frequencyGetData} from "utils/usePollData";
import { useState} from "react";
import {UserInfo} from "../User";
import {API_URL } from "utils";

export default function RecentTrades({
  trades: any,
}: {
  trades: any[];
}) {
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);
    // Results
    const [results, setResults] = useState<UserInfo[]>([]);

    // Backend data (leaderboard)
    const { data, lastChecked } = frequencyGetData(
        API_URL +"/nbc-keys/activities?network=nos&address=&page=1&limit=50",
        20 * 1000
    );

  return (
    <Card title="Recent trades"  updated={`${renderTimeSince(lastChecked)} ago`}>
      <div>
          {data !== undefined?
        <TradeTable trades={data["result"]} />:""}
      </div>
    </Card>
  );
}
