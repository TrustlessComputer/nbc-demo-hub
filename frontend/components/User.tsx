import { parseUSD } from "utils/usd";
import { Button } from "./ui/button";
import { truncateAddress } from "utils";
import { Global, Currency, StateUser } from "state/global";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

/**
 * Extended user object including token cost
 */

export type UserInfo = {
  id: string;
  twitterUsername: string;
  address: string;
  twitterPfpUrl: string;
  supply: number;
  price: number;
  usdPrice: number;
};
export default function User({
  data,
  isMinimal = false,
}: {
  data: UserInfo;
  isMinimal?: boolean;
}) {
  const {
    user,
    setUser,
    currency,
    eth,
    favorites,
    toggleFavorite,
  } = Global.useContainer();

  // Profile image
  const image: string = data.twitterPfpUrl ?? "/rasters/default.png";
  const alt: string = data.twitterUsername
    ? `${data.twitterUsername} profile picture`
    : `${data.id} profile picture`;

  // Username
  const address: string = truncateAddress(data.id, 6);
  const username: string = data.twitterUsername
    ? `${data.twitterUsername}`
    : address;
  const addressLink: string = `https://explorer.l2.trustless.computer/address/${data.id}`;
  const usernameLink: string = data.twitterUsername
    ? `https://twitter.com/${data.twitterUsername}`
    : addressLink;

  return (
    <div className="flex flex-col border rounded-lg bg-white">
      {/* Top section */}
      <div
        onClick={() =>
          setUser({
            address: data.id,
            username: data.twitterUsername,
            image: data.twitterPfpUrl,
            tokenaddress: data.address,
          })
        }
        className="p-2 flex flex-row items-center justify-between w-full"
      >
        {/* Top left (image, handle, address) */}

        <div className="flex items-center">
          <img
            src={image}
            alt={alt}
            width={30}
            height={30}
            className="rounded-md"
          />

          <div className="flex text-xs flex-col pl-2 [&>a:hover]:opacity-70">
            {/* Username */}
            <a
              href="javascript:;"
              style={{ maxWidth: "110px" }}
              rel="noopener noreferrer"
            >
              {username}
            </a>

            {/* Address */}
            <a
              href="javascript:"
              className="text-zinc-400"
              rel="noopener noreferrer"
            >
              {address}
            </a>
          </div>
        </div>

        {/* Top right */}
        <div className="flex items-center">
          {/* Favorite button */}
          <button
            className="mr-2"
            onClick={() =>
              toggleFavorite({
                tokenaddress: "",
                address: data.id.toLowerCase(),
                image,
                username,
              })
            }
          >
            {favorites[data.id.toLowerCase()] ? (
              <StarFilledIcon className="stroke-amber-400 text-amber-400" />
            ) : (
              <StarIcon className="stroke-zinc-200" />
            )}
          </button>

          {/* Trade button */}
          <Button
            style={{ height: "40px" }}
            onClick={() =>
              setUser({
                address: data.id,
                username: data.twitterUsername,
                image: data.twitterPfpUrl,
                tokenaddress: "",
              })
            }
            disabled={user.address === data.id}
            className="text-xs h-7 px-2 py-0 bg-buy hover:bg-buy hover:opacity-70 transition-opacity"
          >
            {isMinimal ? (
              <span>Buy</span>
            ) : currency === Currency.USD ? (
              <span></span>
            ) : (
              <span>
                {" "}
                {Number(data.price).toFixed(5)} BTC <br />$
                {Number(data.usdPrice).toFixed(2)}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom section */}
      {!isMinimal && (
        <div className="flex border-t items-center justify-between px-2 py-1 text-xs text-zinc-500">
          <span>
            {data.supply.toString()} key{Number(data.supply) == 1 ? "" : "s"}
          </span>
        </div>
      )}
    </div>
  );
}
