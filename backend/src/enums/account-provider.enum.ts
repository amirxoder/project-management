export const ProviderEnum = {
  GOOGLE: "google",
  GITHUB: "github",
  FACEBOOK: "facebook",
  TWITTER: "twitter",
  EMAIL: "email",
};

export type ProviderEnumType = keyof typeof ProviderEnum;
