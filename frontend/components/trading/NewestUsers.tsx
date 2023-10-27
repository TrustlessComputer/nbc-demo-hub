import Card from "components/Card";
import User, { type UserInfo } from "components/User";
import {frequencyGetData} from "utils/usePollData";
import { renderTimeSince } from "utils/time";
import {API_URL } from "utils";
export default function NewestUsers({
  users: ssrUsers,
}: {
  users: UserInfo[];
}) {
  // Newest users list
    const { data, lastChecked } = frequencyGetData(
        API_URL +"/player-share/tokens?network=nos&page=1&limit=50&key_type=1&side=0&followers=0,200000&price_usd=0,1000&sort_col=k.created_at&sort_type=0&holder=0&price=0,1000",
        20 * 1000
    );

    let listResults = []
    if(data&&data.result) {
        for (const user of data.result) {
            listResults.push({
                id: user["owner"],
                twitterUsername: user["user_twitter_username"],
                address: user["address"],
                twitterPfpUrl: user["user_twitter_avatar"],
                supply: user["total_supply_number"],
                price: user["price"],
                usdPrice: user["usd_price"],
            })
        }
    }

  return (
    <Card title="Newest users" updated={`${renderTimeSince(lastChecked)} ago`}>
      <div className="flex flex-col p-3 gap-3">
        {listResults.map((user: UserInfo, i: number) => (
          <User key={i} data={user} />
        ))}
      </div>
    </Card>
  );
}
