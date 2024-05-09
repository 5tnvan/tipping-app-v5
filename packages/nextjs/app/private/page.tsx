"use client";

import { NextPage } from "next";
//import AvatarCreator from "~~/components/app/avatar/page";

const PrivatePage: NextPage = () => {
  // const { profile } = useContext(AuthUserContext);
  // const [res, setRes] = useState<any>();
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await fetchFollowersWithRange("30e68e4b-7e19-43be-b890-0592e3e1ec38");
  //     setRes(result);
  //   }
  //   fetchData();
  // }, [profile]);
  return (
    <div className="bg-white text-black">
      {/* <AvatarCreator /> */}
    </div>
  );
};
export default PrivatePage;
