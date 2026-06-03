// =============================================================================
// Eloraa Digitals — Firestore Operations
// =============================================================================

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactSubmission {
  name: string;
  phone: string;
  businessName: string;
  service: string;
  message: string;
  createdAt?: ReturnType<typeof serverTimestamp>;
}

export interface ConsultationBooking {
  uid: string | null;
  name: string;
  phone: string;
  businessName: string;
  service: string;
  preferredDate: Timestamp | Date;
  preferredTime: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: ReturnType<typeof serverTimestamp>;
}

export interface ReviewSubmission {
  uid: string;
  name: string;
  businessName: string;
  rating: number;
  review: string;
  profileImageUrl: string | null;
  approved: boolean;
  createdAt?: ReturnType<typeof serverTimestamp>;
}

// ---------------------------------------------------------------------------
// Generic Firestore Helpers
// ---------------------------------------------------------------------------

async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string | null> {
  const db = getFirebaseDb();
  if (!db) {
    console.warn("Firestore not available — cannot save data.");
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

async function getDocuments<T>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<(T & { id: string })[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
}

async function updateDocument(
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    await updateDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Contact Submissions
// ---------------------------------------------------------------------------

export async function submitContact(
  data: Omit<ContactSubmission, "createdAt">
): Promise<string | null> {
  return addDocument("contacts", data);
}

export async function getContacts(): Promise<
  (ContactSubmission & { id: string })[]
> {
  return getDocuments<ContactSubmission>(
    "contacts",
    orderBy("createdAt", "desc")
  );
}

// ---------------------------------------------------------------------------
// Consultation Bookings
// ---------------------------------------------------------------------------

export async function bookConsultation(
  data: Omit<ConsultationBooking, "createdAt" | "status">
): Promise<string | null> {
  return addDocument("consultations", { ...data, status: "pending" });
}

export async function getConsultations(
  uid?: string
): Promise<(ConsultationBooking & { id: string })[]> {
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
  if (uid) {
    constraints.unshift(where("uid", "==", uid));
  }
  return getDocuments<ConsultationBooking>("consultations", ...constraints);
}

export async function updateConsultationStatus(
  docId: string,
  status: ConsultationBooking["status"]
): Promise<boolean> {
  return updateDocument("consultations", docId, { status });
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export async function submitReview(
  data: Omit<ReviewSubmission, "createdAt" | "approved">
): Promise<string | null> {
  return addDocument("reviews", { ...data, approved: false });
}

export async function getApprovedReviews(): Promise<
  (ReviewSubmission & { id: string })[]
> {
  return getDocuments<ReviewSubmission>(
    "reviews",
    where("approved", "==", true),
    orderBy("createdAt", "desc")
  );
}

export async function getPendingReviews(): Promise<
  (ReviewSubmission & { id: string })[]
> {
  return getDocuments<ReviewSubmission>(
    "reviews",
    where("approved", "==", false),
    orderBy("createdAt", "desc")
  );
}

export async function getUserReviews(
  uid: string
): Promise<(ReviewSubmission & { id: string })[]> {
  return getDocuments<ReviewSubmission>(
    "reviews",
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
}

export async function approveReview(docId: string): Promise<boolean> {
  return updateDocument("reviews", docId, { approved: true });
}

export async function rejectReview(docId: string): Promise<boolean> {
  return deleteDocument("reviews", docId);
}

// ---------------------------------------------------------------------------
// Admin Helpers
// ---------------------------------------------------------------------------

export async function getAdminStats(): Promise<{
  totalContacts: number;
  totalConsultations: number;
  pendingReviews: number;
  thisMonthConsultations: number;
}> {
  const db = getFirebaseDb();
  if (!db)
    return {
      totalContacts: 0,
      totalConsultations: 0,
      pendingReviews: 0,
      thisMonthConsultations: 0,
    };

  try {
    const [contacts, consultations, pendingReviewsList] = await Promise.all([
      getDocs(collection(db, "contacts")),
      getDocs(collection(db, "consultations")),
      getDocs(
        query(collection(db, "reviews"), where("approved", "==", false))
      ),
    ]);

    // Count this month's consultations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthCount = consultations.docs.filter((doc) => {
      const data = doc.data();
      if (data.createdAt && data.createdAt.toDate) {
        return data.createdAt.toDate() >= startOfMonth;
      }
      return false;
    }).length;

    return {
      totalContacts: contacts.size,
      totalConsultations: consultations.size,
      pendingReviews: pendingReviewsList.size,
      thisMonthConsultations: thisMonthCount,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalContacts: 0,
      totalConsultations: 0,
      pendingReviews: 0,
      thisMonthConsultations: 0,
    };
  }
}

// Re-export for convenience
export { isFirebaseConfigured } from "./config";
