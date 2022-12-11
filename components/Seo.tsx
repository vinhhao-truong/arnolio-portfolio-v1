import { NextSeo } from "next-seo";
import Head from "next/head";
import ReactProps from "../interfaces/ReactProps";

enum Locale {
  vn = "vi_VI",
}

interface HeadProps extends ReactProps {
  title?: string;
  description?: string;
  og?: {
    title?: string;
    url?: string;
    image?: string;
    description?: string;
    locale?: Locale;
  };
}
const Seo: React.FC<HeadProps> = ({ title, description, og }) => {
  return (
    // <Head>
    //   <link
    //     rel="apple-touch-icon"
    //     sizes="180x180"
    //     href="rounded-icon/apple-touch-icon.png"
    //   />
    //   <link
    //     rel="icon"
    //     type="image/png"
    //     sizes="32x32"
    //     href="rounded-icon/favicon-32x32.png"
    //   />
    //   <link
    //     rel="icon"
    //     type="image/png"
    //     sizes="16x16"
    //     href="rounded-icon/favicon-16x16.png"
    //   />
    //   <link rel="manifest" href="rounded-icon/site.webmanifest" />
    //   {title && <title>{title}</title>}
    //   {description && <meta property="description" content={description} />}
    //   {og?.locale && <meta property="og:locale" content={og.locale} />}
    //   {og?.title && <meta property="og:title" content={og.title} />}
    //   {og?.url && <meta property="og:url" content={og.url} />}
    //   {og?.image && <meta property="og:image" content={og.image} />}
    //   {og?.description && (
    //     <meta property="og:description" content={og.description} />
    //   )}
    // </Head>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        ...og,
      }}
    />
  );
};

export default Seo;
