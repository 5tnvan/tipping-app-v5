import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/app-color-switch.css";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tipping App",
    template: "%s | Tipping App",
  },
  description: "Built with ♡",
  openGraph: {
    title: {
      default: "Tipping App",
      template: "%s | Tipping App",
    },
    description: "Built with ♡",
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
      default: "Tipping App",
      template: "%s | Tipping App",
    },
    description: "Built with ♡",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            <div className="app backgr gradient">
              {/* BG */}
              <div className="anim">
                <div className="base one"></div>
                <div className="base two"></div>
                <div className="base three"></div>
              </div>
              {/* BG */}
              {/* <div className="black-gradient">black gradient thing</div> */}
              {children}
            </div>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
