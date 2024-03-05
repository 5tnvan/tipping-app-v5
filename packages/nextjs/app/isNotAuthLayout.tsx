import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-yellow-200">this is IsNotAuth layout</div>
      <div>{children}</div>
    </>
  );
};

export default IsNotAuth;
