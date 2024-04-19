import React, { useState, useEffect } from "react";
import { Avatar } from "./authentication/Avatar";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";

type AddressProps = {
  address: string;
};

export const AddressToProfile = ({ address }: AddressProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const fetchedProfile = await fetchPublicProfileFromWalletId(address);
        setProfile(fetchedProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      // Cleanup if necessary
    };
  }, []); // Run effect when 'address' prop changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {profile ? (
        <div>
          <Avatar profile={profile} width={12} ring={0} height={8} border={0} gradient={undefined} />
          <span>@{profile.username}</span>
        </div>
      ) : (
        <div>No profile found for address: {address}</div>
      )}
    </>
  );
};