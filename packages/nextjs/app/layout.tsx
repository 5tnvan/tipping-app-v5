import WildPayApp from "./wildpayLayout";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/app.css";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kinnect",
    template: "%s | Kinnect",
  },
  description: "Social Wallet | Built with ♡",
  openGraph: {
    title: {
      default: "Kinnect",
      template: "%s | Kinnect",
    },
    description: "Social Wallet | Built with ♡",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Kinnect",
      template: "%s | Kinnect",
    },
    description: "Social Wallet | Built with ♡",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false} defaultTheme="light" forcedTheme="light">
          <ScaffoldEthAppWithProviders>
            <WildPayApp>{children}</WildPayApp>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
