import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Flex, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { Navbar } from "@/components/Navbar/Navbar";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Flex className="container">
            <Navbar />
            <main>{children}</main>
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
