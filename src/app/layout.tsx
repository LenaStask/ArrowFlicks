import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import "@mantine/core/styles.css";
import "./layout.css";

export const metadata: Metadata = {
  title: "Arrow Flicks",
  description: "Movie Search App",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
