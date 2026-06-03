// =============================================================================
// Eloraa Digitals — Firebase Storage Operations
// =============================================================================

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirebaseStorage } from "./config";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * Upload a profile image to Firebase Storage.
 * Returns the download URL or null if Storage is not configured.
 */
export async function uploadProfileImage(
  userId: string,
  file: File
): Promise<string | null> {
  const storage = getFirebaseStorage();
  if (!storage) {
    console.warn("Firebase Storage not configured — cannot upload image.");
    return null;
  }

  // Validate file
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be under 5MB.");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, and AVIF images are allowed.");
  }

  const extension = file.name.split(".").pop() || "jpg";
  const storageRef = ref(
    storage,
    `profiles/${userId}/avatar.${extension}`
  );

  try {
    await uploadBytes(storageRef, file, {
      contentType: file.type,
    });
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
}

/**
 * Get the download URL for a profile image.
 */
export async function getProfileImageUrl(
  userId: string
): Promise<string | null> {
  const storage = getFirebaseStorage();
  if (!storage) return null;

  try {
    const storageRef = ref(storage, `profiles/${userId}/avatar.jpg`);
    return await getDownloadURL(storageRef);
  } catch {
    // Image doesn't exist — that's fine
    return null;
  }
}

/**
 * Delete a profile image from Firebase Storage.
 */
export async function deleteProfileImage(userId: string): Promise<boolean> {
  const storage = getFirebaseStorage();
  if (!storage) return false;

  try {
    const storageRef = ref(storage, `profiles/${userId}/avatar.jpg`);
    await deleteObject(storageRef);
    return true;
  } catch {
    return false;
  }
}
