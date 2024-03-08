import { version as uuidVersion, validate as uuidValidate } from 'uuid';

export const uuidValidateV4 = (uuid) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};
