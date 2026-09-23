import { loginUser } from "../api/users";

export function useLogin() {
  async function loginPost(name: string, password: string) {
    const res = await loginUser(name, password);
    const { token } = res;
    return token;
  }
  return { loginPost };
}
