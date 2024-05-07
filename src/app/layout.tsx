import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arrow Flicks",
  description: "Movie Search App",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
