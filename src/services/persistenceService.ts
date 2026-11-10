import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Booking, BookingStatus, Mechanic, Customer, Invoice, JobCard } from '../types/admin';
import {
  INITIAL_BOOKINGS,
  INITIAL_MECHANICS,
  INITIAL_CUSTOMERS,
  INITIAL_INVOICES,
  INITIAL_JOB_CARDS
} from '../data/mockAdminData';

const BOOKINGS_COLLECTION = 'bookings';
const MECHANICS_COLLECTION = 'mechanics';
const CUSTOMERS_COLLECTION = 'customers';
const INVOICES_COLLECTION = 'invoices';
const JOBCARDS_COLLECTION = 'jobCards';

// Local storage fallbacks
const LOCAL_BOOKINGS_KEY = 'yesbike_admin_bookings';
const LOCAL_MECHANICS_KEY = 'yesbike_admin_mechanics';
const LOCAL_CUSTOMERS_KEY = 'yesbike_admin_customers';
const LOCAL_INVOICES_KEY = 'yesbike_admin_invoices';
const LOCAL_JOBCARDS_KEY = 'yesbike_admin_jobcards';

/**
 * Seed initial records into Firestore if database is empty on first boot
 */
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, BOOKINGS_COLLECTION));
    if (snap.empty) {
      console.log('[Firestore] Seeding initial persistent records into Firestore...');
      for (const b of INITIAL_BOOKINGS) {
        await setDoc(doc(db, BOOKINGS_COLLECTION, b.id), b);
      }
      for (const m of INITIAL_MECHANICS) {
        await setDoc(doc(db, MECHANICS_COLLECTION, m.id), m);
      }
      for (const c of INITIAL_CUSTOMERS) {
        await setDoc(doc(db, CUSTOMERS_COLLECTION, c.id), c);
      }
      for (const inv of INITIAL_INVOICES) {
        await setDoc(doc(db, INVOICES_COLLECTION, inv.invoiceNumber), inv);
      }
      for (const jc of INITIAL_JOB_CARDS) {
        await setDoc(doc(db, JOBCARDS_COLLECTION, jc.jobCardNumber), jc);
      }
      console.log('[Firestore] Initial data seeding complete.');
    }
  } catch (err) {
    console.warn('[Firestore Notice] Seed check completed (using offline/cached state):', err);
  }
}

/**
 * Save new or updated booking permanently into Firestore and localStorage
 */
export async function saveBookingPermanently(booking: Booking): Promise<void> {
  // 1. Save to local storage for instant offline availability
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    const list: Booking[] = raw ? JSON.parse(raw) : INITIAL_BOOKINGS;
    const filtered = list.filter((b) => b.id !== booking.id);
    const updated = [booking, ...filtered];
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.warn('Local storage write notice:', e);
  }

  // 2. Persist permanently into Firestore database
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, booking.id);
    await setDoc(docRef, booking, { merge: true });
    console.log(`[Firestore] Booking ${booking.id} permanently saved in database.`);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${BOOKINGS_COLLECTION}/${booking.id}`);
  }
}

/**
 * Update booking status with audit history log permanently
 */
export async function updateBookingStatusPermanently(
  bookingId: string,
  newStatus: BookingStatus,
  note?: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const historyEntry = {
    timestamp,
    status: newStatus,
    note: note || `Status updated to ${newStatus.replace(/_/g, ' ')}`,
    updatedBy: 'Admin Console'
  };

  // 1. Update localStorage
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    if (raw) {
      const list: Booking[] = JSON.parse(raw);
      const updated = list.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: newStatus,
          isNew: false,
          history: [...(b.history || []), historyEntry]
        };
      });
      localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {
    console.warn('Local storage status update notice:', e);
  }

  // 2. Update Firestore
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await updateDoc(docRef, {
      status: newStatus,
      isNew: false
    });
    console.log(`[Firestore] Status for ${bookingId} permanently updated to ${newStatus}.`);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${BOOKINGS_COLLECTION}/${bookingId}`);
  }
}

/**
 * Assign mechanic to booking permanently
 */
export async function assignMechanicPermanently(
  bookingId: string,
  mechanic: Mechanic
): Promise<void> {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const historyEntry = {
    timestamp,
    status: 'mechanic_assigned' as BookingStatus,
    note: `Assigned to technician ${mechanic.name} (${mechanic.phone})`,
    updatedBy: 'Admin Dispatch'
  };

  // LocalStorage
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    if (raw) {
      const list: Booking[] = JSON.parse(raw);
      const updated = list.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          mechanicId: mechanic.id,
          mechanicName: mechanic.name,
          status: 'mechanic_assigned' as BookingStatus,
          isNew: false,
          history: [...(b.history || []), historyEntry]
        };
      });
      localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updated));
    }

    const mechRaw = localStorage.getItem(LOCAL_MECHANICS_KEY);
    if (mechRaw) {
      const mechs: Mechanic[] = JSON.parse(mechRaw);
      const updatedMechs = mechs.map((m) =>
        m.id === mechanic.id ? { ...m, status: 'on_job' as const, activeBookingId: bookingId } : m
      );
      localStorage.setItem(LOCAL_MECHANICS_KEY, JSON.stringify(updatedMechs));
    }
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.warn('Local storage assign notice:', e);
  }

  // Firestore
  try {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
      mechanicId: mechanic.id,
      mechanicName: mechanic.name,
      status: 'mechanic_assigned',
      isNew: false
    });
    await updateDoc(doc(db, MECHANICS_COLLECTION, mechanic.id), {
      status: 'on_job',
      activeBookingId: bookingId
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${BOOKINGS_COLLECTION}/${bookingId}`);
  }
}

/**
 * Save new mechanic profile permanently
 */
export async function saveMechanicPermanently(mechanic: Mechanic): Promise<void> {
  try {
    const raw = localStorage.getItem(LOCAL_MECHANICS_KEY);
    const list: Mechanic[] = raw ? JSON.parse(raw) : INITIAL_MECHANICS;
    const updated = [mechanic, ...list.filter((m) => m.id !== mechanic.id)];
    localStorage.setItem(LOCAL_MECHANICS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.warn('Local storage write notice:', e);
  }

  try {
    await setDoc(doc(db, MECHANICS_COLLECTION, mechanic.id), mechanic, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${MECHANICS_COLLECTION}/${mechanic.id}`);
  }
}

/**
 * Save invoice permanently
 */
export async function saveInvoicePermanently(invoice: Invoice): Promise<void> {
  try {
    const raw = localStorage.getItem(LOCAL_INVOICES_KEY);
    const list: Invoice[] = raw ? JSON.parse(raw) : INITIAL_INVOICES;
    const updated = [invoice, ...list.filter((inv) => inv.invoiceNumber !== invoice.invoiceNumber)];
    localStorage.setItem(LOCAL_INVOICES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.warn('Local storage write notice:', e);
  }

  try {
    await setDoc(doc(db, INVOICES_COLLECTION, invoice.invoiceNumber), invoice, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${INVOICES_COLLECTION}/${invoice.invoiceNumber}`);
  }
}

/**
 * Save job card permanently
 */
export async function saveJobCardPermanently(jobCard: JobCard): Promise<void> {
  try {
    const raw = localStorage.getItem(LOCAL_JOBCARDS_KEY);
    const list: JobCard[] = raw ? JSON.parse(raw) : INITIAL_JOB_CARDS;
    const updated = [jobCard, ...list.filter((jc) => jc.jobCardNumber !== jobCard.jobCardNumber)];
    localStorage.setItem(LOCAL_JOBCARDS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.warn('Local storage write notice:', e);
  }

  try {
    await setDoc(doc(db, JOBCARDS_COLLECTION, jobCard.jobCardNumber), jobCard, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${JOBCARDS_COLLECTION}/${jobCard.jobCardNumber}`);
  }
}

/**
 * Real-time subscription to Bookings collection
 */
export function subscribeToBookings(callback: (bookings: Booking[]) => void): () => void {
  const colRef = collection(db, BOOKINGS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: Booking[] = [];
        snapshot.forEach((d) => items.push(d.data() as Booking));
        // Sort descending by createdAt or date
        items.sort((a, b) => (b.createdAt || b.date).localeCompare(a.createdAt || a.date));
        callback(items);
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(items));
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, BOOKINGS_COLLECTION);
    }
  );
}

/**
 * Real-time subscription to Mechanics collection
 */
export function subscribeToMechanics(callback: (mechanics: Mechanic[]) => void): () => void {
  const colRef = collection(db, MECHANICS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: Mechanic[] = [];
        snapshot.forEach((d) => items.push(d.data() as Mechanic));
        callback(items);
        localStorage.setItem(LOCAL_MECHANICS_KEY, JSON.stringify(items));
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, MECHANICS_COLLECTION);
    }
  );
}

/**
 * Real-time subscription to Invoices collection
 */
export function subscribeToInvoices(callback: (invoices: Invoice[]) => void): () => void {
  const colRef = collection(db, INVOICES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: Invoice[] = [];
        snapshot.forEach((d) => items.push(d.data() as Invoice));
        callback(items);
        localStorage.setItem(LOCAL_INVOICES_KEY, JSON.stringify(items));
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, INVOICES_COLLECTION);
    }
  );
}

/**
 * Real-time subscription to Job Cards collection
 */
export function subscribeToJobCards(callback: (jobCards: JobCard[]) => void): () => void {
  const colRef = collection(db, JOBCARDS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: JobCard[] = [];
        snapshot.forEach((d) => items.push(d.data() as JobCard));
        callback(items);
        localStorage.setItem(LOCAL_JOBCARDS_KEY, JSON.stringify(items));
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, JOBCARDS_COLLECTION);
    }
  );
}
