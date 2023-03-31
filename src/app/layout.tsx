import "./globals.css";

export const metadata = {
  title: "Mars Protocol",
  description:
    "Mars Protocol is a decentralized protocol for the creation of synthetic assets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>{children}</body>
    </html>
  );
}
