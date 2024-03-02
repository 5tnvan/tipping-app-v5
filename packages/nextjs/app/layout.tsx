import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/app-color-switch.css";
import "~~/styles/app.css";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;
const heartIconUrl = `${baseUrl}/heart-giga.png`;

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
            {/* CUST-NAVBAR */}
            {/* <div id="cust-navbar" className="flex flex-col pl-6 pr-20 pt-8 pb-8 mr-10 rounded-xl bg-white w-95vh">
              
              <div className="flex text-red-600 font-bold mb-5">
                <img src={heartIconUrl} alt="wildheart" width={20} height={20} />
                <div className="ml-2">wildheart</div>
              </div>
              
              <div className="flex flex-col grow">
                
                <div id="cust-links" className="">
                  <a href="" className="flex mb-2">
                    <DoubleChevronIcon /> <div className="ml-1 font-normal">Get Started</div>
                  </a>
                  <a href="" className="flex mb-2">
                    <LoginIcon /> <div className="ml-1 font-normal text-slate-600">Log In</div>
                  </a>
                </div>
                
                <div id="cust-socials" className="flex grow items-end">
                  <YoutubeIcon handle="heartip" />
                  <TwitterIcon handle="heartip" />
                  <InstagramIcon handle="heartip" />
                  <TiktokIcon handle="heartip" />
                </div>
              </div>
            </div> */}
            {/* APP */}
            {children}
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
