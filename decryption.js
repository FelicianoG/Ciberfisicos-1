import CryptoJS from 'crypto-js';

// Decrypt a message
function decryptMessage(encryptedMessage, keyString, ivString) {
    if (!encryptedMessage || typeof encryptedMessage !== "string") {
        throw new Error("Encrypted message is missing or invalid");
    }
    if (!keyString || keyString.length !== 16) {
        throw new Error("Key must be a 16-byte string");
    }
    if (!ivString || ivString.length !== 16) {
        throw new Error("IV must be a 16-byte string");
    }

    // Parse key and IV to CryptoJS format
    const key = CryptoJS.enc.Utf8.parse(keyString);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    try {
        // Decrypt the message
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Convert decrypted data to UTF-8 string
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

        if (!plaintext) {
            throw new Error("Decryption failed; resulting plaintext is empty");
        }

        return plaintext;
    } catch (error) {
        throw new Error(`Decryption error: ${error.message}`);
    }
}

// Example usage
try {
    // Replace with your encrypted message (Base64 encoded)
    const encryptedMessage = "Cv9gMKmxtbzkpwLBzSWYIQ==";

    // Replace with your 16-byte key and IV
    const key = "holasoydiegovalu"; // Must match the key used for encryption
    const iv = "holasoydiegovalu";  // Must match the IV used for encryption

    // Decrypt the message
    const plaintext = decryptMessage(encryptedMessage, key, iv);
    console.log("Decrypted Message:", plaintext);
} catch (error) {
    console.error("Error:", error.message);
}