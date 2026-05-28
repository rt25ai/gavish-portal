export const MAX_NAME_LENGTH = 80;
export const MAX_ORG_LENGTH = 120;
export const MAX_TITLE_LENGTH = 120;

export type ProfileDetailsInput = {
  fullName: string;
  organization: string;
  title: string;
};

export function validateProfileDetails(input: ProfileDetailsInput): string | null {
  if (!input.fullName) return "שם מלא הוא שדה חובה.";
  if (input.fullName.length > MAX_NAME_LENGTH)
    return `שם ארוך מדי (עד ${MAX_NAME_LENGTH} תווים).`;
  if (input.organization.length > MAX_ORG_LENGTH)
    return `שם רשות ארוך מדי (עד ${MAX_ORG_LENGTH} תווים).`;
  if (input.title.length > MAX_TITLE_LENGTH)
    return `תפקיד ארוך מדי (עד ${MAX_TITLE_LENGTH} תווים).`;
  return null;
}
