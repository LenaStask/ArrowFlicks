import { Navbar } from "@/components/Navbar/Navbar";
import "./global.css";
import "@mantine/core/styles.css";
import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import { Flex } from "@mantine/core";

export default function RootLayout({ children }: { children: any }) {
  return (
    <ReactQueryClientProvider>
      <Flex className="container">
        <Navbar />
        <main>{children}</main>
      </Flex>
    </ReactQueryClientProvider>
  );
}
