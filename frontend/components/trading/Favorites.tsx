import User from "components/User";
import Card from "components/Card";
import { Global, StateUser } from "state/global";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const FORCED_DEFAULTS = {
  cost: 0,
  profileChecked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Favorites() {
  // Favorites list
  const { favorites } = Global.useContainer();

  return (
    <Card title="Favorites" >
      <div className="h-full">
        <div className="p-3 h-full">
          {Object.keys(favorites).length === 0 ? (
            // No favorites saved
            <div className="flex h-full flex-col items-center justify-center border border-dashed rounded-md text-zinc-500">
              <CrossCircledIcon className="w-12 h-12" />
              <span className="pt-2">No favorites saved</span>
            </div>
          )  : (
            // Favorites data
            <div className="flex w-full flex-col gap-y-3 pb-3">
              {Object.keys(favorites).map((object, i)  => (
                  <User
                      key={i}
                      data={{
                        id: favorites[object].address,
                        address: favorites[object].address,
                        twitterPfpUrl: favorites[object].image ,
                        twitterUsername: favorites[object].username,
                        supply:0,
                        price:0,
                        usdPrice:0,
                        // Defaults to adhere
                        ...FORCED_DEFAULTS,
                      }}
                      isMinimal={true}
                  />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
