/**
 * Room access form that handles room creation and joining.
 * Features:
 * - Tabbed Create / Join UI
 * - Room joining form
 * - Form validation
 * - Redirection handling
 */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { cn, parseError } from "@/lib/utils";

import { BackButton } from "./components/back-button";
import { CreateRoomSection } from "./components/create-room-section";
import { InvitedSection } from "./components/invited-section";
import { JoinRoomSection } from "./components/join-room-section";
import { RedirectingCard } from "./components/redirecting-card";
import type { CreateRoomForm, JoinRoomForm } from "./types";
import { createRoom, isRoomIdValid, joinRoom } from "./utils";

interface RoomAccessFormProps {
  roomId: string;
}

type TabKey = "create" | "join";

const RoomAccessForm = ({ roomId }: RoomAccessFormProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("create");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleJoinRoom = async (data: JoinRoomForm) => {
    setIsJoining(true);
    try {
      const joinPromise = joinRoom(data.roomId, data.name);

      toast.promise(joinPromise, {
        loading: "Joining room, please wait...",
        success: () => {
          router.push(`/room/${data.roomId}`);
          return "Joined room successfully. Happy coding!";
        },
        error: (error) => `Failed to join room.\n${parseError(error)}`,
      });

      await joinPromise;
      setIsSuccessful(true);
    } catch {
      // Toast already handles the error
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateRoom = async (data: CreateRoomForm) => {
    setIsCreating(true);
    try {
      const createPromise = createRoom(data.name);

      toast.promise(createPromise, {
        loading: "Creating room, please wait...",
        success: (roomId) => {
          router.push(`/room/${roomId}`);
          navigator.clipboard.writeText(roomId);
          return "Room created successfully. Happy coding!";
        },
        error: (error) => `Failed to create room.\n${parseError(error)}`,
      });

      await createPromise;
      setIsSuccessful(true);
    } catch {
      // Toast already handles the error
    } finally {
      setIsCreating(false);
    }
  };

  if (isSuccessful) {
    return (
      <div className="flex items-center justify-center py-16">
        <RedirectingCard />
      </div>
    );
  }

  // Once a roomId is present in the URL (invite link), the tabbed
  // create/join chooser is irrelevant — the user is either joining that
  // specific room or looking at an invalid-link message.
  const isInviteFlow = roomId.length > 0;

  return (
    <section
      aria-label="Room access form"
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      {!isInviteFlow && (
        <div className="flex border-border border-b" role="tablist">
          <button
            aria-selected={activeTab === "create"}
            className={cn(
              "flex-1 border-b-2 py-3.5 font-medium text-sm transition-colors",
              activeTab === "create"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("create")}
            role="tab"
            type="button"
          >
            Create a Room
          </button>
          <button
            aria-selected={activeTab === "join"}
            className={cn(
              "flex-1 border-b-2 py-3.5 font-medium text-sm transition-colors",
              activeTab === "join"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("join")}
            role="tab"
            type="button"
          >
            Join a Room
          </button>
        </div>
      )}

      <div className="p-6 sm:p-7">
        {(() => {
          if (roomId && isRoomIdValid(roomId)) {
            return (
              <>
                {/* biome-ignore lint/a11y/useSemanticElements: status div for invitation message */}
                <div
                  aria-live="polite"
                  className="mb-5 space-y-2 text-center"
                  role="status"
                >
                  <p className="text-foreground text-lg sm:text-xl">
                    Enter your name to join the room
                  </p>
                  <p className="text-base text-muted-foreground sm:text-lg">
                    Room:{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {roomId}
                    </span>
                  </p>
                </div>
                <InvitedSection
                  isCreating={isCreating}
                  isSubmitting={isJoining}
                  onSubmit={handleJoinRoom}
                  roomId={roomId}
                />
                <div className="mt-4">
                  <BackButton
                    disabled={isJoining}
                    onClick={() => router.push("/")}
                  />
                </div>
              </>
            );
          }
          if (roomId) {
            return (
              // biome-ignore lint/a11y/useSemanticElements: status div for invalid room message
              <div
                aria-live="polite"
                className="flex flex-col space-y-4 text-center"
                role="status"
              >
                <p className="font-medium text-foreground text-lg sm:text-xl">
                  Invalid room ID
                </p>
                <p className="text-muted-foreground">
                  Please check the invite link and try again.
                  <br />
                  Room ID should look like this:{" "}
                  <span className="font-mono font-semibold text-foreground">
                    XXXX-XXXX
                  </span>
                </p>
                <BackButton
                  disabled={isJoining}
                  onClick={() => router.push("/")}
                />
              </div>
            );
          }
          return activeTab === "create" ? (
            <CreateRoomSection
              isJoining={isJoining}
              isSubmitting={isCreating}
              onSubmit={handleCreateRoom}
            />
          ) : (
            <JoinRoomSection
              defaultRoomId=""
              isCreating={isCreating}
              isSubmitting={isJoining}
              onSubmit={handleJoinRoom}
            />
          );
        })()}
      </div>
    </section>
  );
};

export { RoomAccessForm };
