import crypto from "crypto";
import { KEY } from "./constant.js";

export function symmetricEncrypt(data, key = KEY) {
  let cipher = crypto.createCipher("aes192", key);
  let encrypted = cipher.update(data, "utf8", "hex");
  return encrypted + cipher.final("hex");
}

export function symmetricDecrypt(en, key = KEY) {
  let decipher = crypto.createDecipher("aes192", key);
  let decrypted = decipher.update(en, "hex", "utf8");
  return decrypted + decipher.final("utf8");
}

export function encrypt(str, salt) {
  return crypto.createHmac("sha256", salt).update(str).digest("hex");
}

export function randomStr(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len);
}
