export type EventListItem = {
  id: string;
  name: string;
  dateFrom: string;
  dateTo?: string;
};

export type EventDetail = {
  id: string;
  name: string;
  description: string;
  link: string;
  dateFrom: string;
  dateTo?: string;
};

// interface IdentityData {
//   email: string;
//   email_verified: boolean;
//   phone_verified: boolean;
//   sub: string;
// }
//
// interface Identity {
//   id: string;
//   user_id: string;
//   identity_data: IdentityData;
//   provider: string;
//   last_sign_in_at: string;
//   created_at: string;
//   updated_at: string;
// }
//
// interface AppMetadata {
//   provider: string;
//   providers: string[];
// }
//
// export interface User {
//   id: string;
//   aud: string;
//   role: string;
//   email: string;
//   email_confirmed_at: string;
//   phone: string;
//   confirmation_sent_at: string;
//   confirmed_at: string;
//   last_sign_in_at: string;
//   app_metadata: AppMetadata;
//   user_metadata: Record<string, unknown>;
//   identities: Identity[];
//   created_at: string;
//   updated_at: string;
// }
