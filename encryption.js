import CryptoJS from 'crypto-js';

// Encryption function
function encryptMessage(message, keyString, ivString) {
    // Convert key and IV to CryptoJS format
    const key = CryptoJS.enc.Utf8.parse(keyString);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    // Encrypt the message
    const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    // Return the encrypted message in Base64 format
    return encrypted.toString();
}

// Example usage
const message = "0.5";
const key = "holasoydiegovalu"; // Must be 16 bytes for AES-128
const iv = "holasoydiegovalu";  // Must be 16 bytes for AES

const encryptedMessage = encryptMessage(message, key, iv);
console.log("Encrypted message:", encryptedMessage);