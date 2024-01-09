import React from "react";

interface ProfileCardProps {
  className?: string;
  children: React.ReactNode;
}

function ProfileCard({ className, children }: ProfileCardProps) {
  return (
    <div className={`border border-slate-300  rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export default ProfileCard;
