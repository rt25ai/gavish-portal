import { AvatarUploader } from "./avatar-uploader";
import { ProfileDetailsForm } from "./profile-details-form";

export type AccountFormProfile = {
  fullName: string;
  organization: string | null;
  title: string | null;
  avatarUrl: string | null;
  email: string;
};

export function AccountForm({ profile }: { profile: AccountFormProfile }) {
  return (
    <div className="space-y-12">
      <AvatarUploader
        fullName={profile.fullName}
        avatarUrl={profile.avatarUrl}
      />

      <div className="border-t border-navy-900/8" />

      <ProfileDetailsForm
        values={{
          fullName: profile.fullName,
          organization: profile.organization,
          title: profile.title,
          email: profile.email,
        }}
      />
    </div>
  );
}
