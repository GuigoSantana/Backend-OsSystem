import { UserToken } from "../types/types";

export const getReqUsuarioId = (reqUser: UserToken) => {
  const user = reqUser;
  const usuarioId = user.sub;
  return usuarioId;
};
