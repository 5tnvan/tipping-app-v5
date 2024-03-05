import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <div className="bg-violet-100">this is Profile layout</div>
      <div></div> */}
      {children}
    </>
  );
};

export default ProfileLayout;
