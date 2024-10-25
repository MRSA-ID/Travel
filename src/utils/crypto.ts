import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_SECRET_KEY;

export const cryptoUtils = {
  encrypt: (data: string | object | object[]): string => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      ENCRYPTION_KEY,
    ).toString();
  },

  decrypt: (encryptedData: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption error:", error);
      return "";
    }
  },
};
