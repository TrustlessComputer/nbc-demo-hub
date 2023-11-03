import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import React from "react";
import Address from "components/Address";
import type { ReactElement } from "react";
import { Global, Currency } from "state/global";

// Render row background depending on trade type
function ColoredRow({
  isBuy,
  children,
}: {
  isBuy: string;
  children: ReactElement[];
}) {
  return isBuy =="buy" ? (
    <TableRow className="bg-buy-30">{children}</TableRow>
  ) : (
    <TableRow className="bg-sell-30">{children}</TableRow>
  );
}

export default function TradeTable({
  trades,
}: {
  trades: any[];
}) {
  const { eth, currency } = Global.useContainer();

  return (
    <Table className="min-w-[950px] [&_td]:py-1">
      <TableHeader className="sticky top-0">
        <TableRow>
          <TableHead>Time </TableHead>
          <TableHead>From</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Keys Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.filter(a => a.activity == "trade").map((trade, i) => {

          return (
            <ColoredRow isBuy={trade.action_type} key={i}>

              <TableCell suppressHydrationWarning={true}>
                {trade.activity_time}
              </TableCell>

              <TableCell>
                <Address
                  address={trade.user.address}
                  username={trade.user.twitter_name}
                  image={trade.user.twitter_avatar}
                />
              </TableCell>
              <TableCell>
                <Address
                  address={trade.player.address}
                  username={trade.player.twitter_name}
                  image={trade.player.twitter_avatar}
                />
              </TableCell>
              <TableCell>
                {trade.action_type == "buy" ? "+" : "-"}
                {trade.amount.toString()}
              </TableCell>
              <TableCell>
                {trade.action_type == "buy" ? (
                  <span className="text-buy">{ Number(trade.price).toFixed(6)} btc <br/>${Number(trade.price_usd).toFixed(2)} </span>
                ) : (
                  <span className="text-sell">{ Number(trade.price).toFixed(6)} btc <br/>${Number(trade.price_usd).toFixed(2)} </span>
                )}
              </TableCell>
              <TableCell>
                {trade.action_type == "buy" ? (
                    <span className="text-buy">{ Number(trade.price*trade.amount).toFixed(6)} btc <br/>${Number(trade.price_usd*trade.amount).toFixed(2)} </span>
                ) : (
                    <span className="text-sell">{ Number(trade.price*trade.amount).toFixed(6)} btc <br/>${Number(trade.price_usd*trade.amount).toFixed(2)} </span>
                )}
              </TableCell>
            </ColoredRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
