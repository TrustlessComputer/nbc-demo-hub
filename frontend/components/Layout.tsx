import Head from "next/head";
import Header from "components/Header";
import type { ReactElement } from "react";
import { Global, type StateUser } from "state/global";

export default function Layout({
  user,
  children,
}: {
  user: StateUser;
  children: ReactElement | ReactElement[];
}) {
  return (
    // Wrap in global state provider (at layout level)
    <Global.Provider initialState={user}>
      <div>
        {/* Meta tags */}
        <Meta />

        {/* Header */}
        <Header />

        <div>{children}</div>
      </div>
    </Global.Provider>
  );
}

function Meta() {
  const meta = {
    url: "https://nbc.newbitcoindex.com",
    image: "https://cdn.newbitcoincity.com/nbc/images/alpha_metadata_06.png",
    title: "NBC | Advanced NBC trading platform on Bitcoin",
    description:
      "NBC is THE pro trading platform for users. No invite code necessary, real-time statistics, analytics, and more.",
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />

      {/* Favicon */}
      <link rel="icon" href="" sizes="any" />

      {/* OG + Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.url} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />
    </Head>
  );
}
