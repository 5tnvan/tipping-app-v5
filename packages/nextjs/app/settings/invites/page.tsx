"use client";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "~~/app/context";
import { ProfileRevealInvite } from "~~/components/app/ProfileRevealInvite";
import { InviteGenerateModal } from "~~/components/app/modal/InviteGenerateModal";
import { InviteModal } from "~~/components/app/modal/InviteModal";
import { fetchInvites } from "~~/utils/app/fetch/fetchInvites";

export default function InvitesPage() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [invite, setInvite] = useState<any>();
  const [invites, setInvites] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchInvites();
      setInvites(res);
    };
    fetch();
  }, [triggerRefetch]);

  /**
   * ACTION: Open close
   **/
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const openInviteModal = () => {
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
  };

  /**
   * ACTION: Open close
   **/
  const [isInviteGenerateModalOpen, setInviteGenerateModalOpen] = useState(false);

  const openInviteGenerateModal = () => {
    setInviteGenerateModalOpen(true);
  };

  const closeInviteGenerateModal = () => {
    setInviteGenerateModalOpen(false);
  };

  if (isAuthenticated == "yes") {
    return (
      <>
        <div id="wildpay-is-auth-settings" className="profile mt-5 mb-5 ml-6 mr-6 z-10">
          {/* CTA BUTTON */}
          <div id="wildpay-cta" className="mb-5 z-1 relative">
            <button className="btn w-full text-base btn-primary" onClick={() => router.back()}>
              Back to Settings
            </button>
          </div>
          {/* Codes */}
          <div className="mb-3">My Codes</div>
          <div className="mb-5">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                <EnvelopeOpenIcon width={16} />
                {invites?.length}
              </div>
              <div className="btn btn-accent" onClick={openInviteGenerateModal}>
                Generate
              </div>
            </label>
          </div>
          {/* Invitation */}
          <div className="mb-3">My Invites</div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="pl-0">Claimed by</th>
                  <th>Type</th>
                  <th className="pr-0 text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {invites?.map((invite: any) => (
                  <tr key={invite.id}>
                    <td className="pl-0">
                      <ProfileRevealInvite profile_id={invite.claimed_by} />
                    </td>
                    <td>
                      {invite.type == 1 && "Creator Invite"}
                      {invite.type == 2 && "Builder Invite"}
                      {invite.type == 3 && "Architect Invite"}
                      {invite.type == 4 && "Visionary Invite"}
                      {invite.type == 5 && "God-mode Invite"}
                    </td>
                    <th className="pr-0 text-right">
                      <button
                        className="btn btn-accent btn-xs"
                        onClick={() => {
                          setInvite(invite);
                          openInviteModal();
                        }}
                      >
                        View code
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            {invites?.length == 0 && (
              <div className="flex h-full justify-center items-center mt-2">
                <div className="btn btn-neutral" onClick={openInviteGenerateModal}>
                  Generate an invite 🥳
                </div>
              </div>
            )}
          </div>
          {/* Invite Generate Modal */}
          <InviteModal isOpen={isInviteModalOpen} onClose={closeInviteModal} data={invite} />
          <InviteGenerateModal
            isOpen={isInviteGenerateModalOpen}
            onClose={closeInviteGenerateModal}
            data={invites}
            refetch={refetch}
          />
        </div>
      </>
    );
  }
}
