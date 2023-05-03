import NextAuth from "next-auth"

interface IUser extends DefaultUser {
  id        :number,
  name      :string,
  email     :string,
  image?    :string,
  role?     :string;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}