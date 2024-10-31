export interface user {
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_picture: string;
}

interface date_options {
  year: "numeric";
  month: "long";
  day: "numeric";
}

export const date_options: date_options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
