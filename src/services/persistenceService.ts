import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Booking, Mechanic, Invoice, JobCard, BookingStatus, Customer } from '../types/admin';
import {
  INITIAL_BOOKINGS,
  INITIAL_MECHANICS,
  INITIAL_INVOICES,
  INITIAL_JOB_CARDS
} from '../data/mockAdminData';

const COLLECTIONS = {
  BOOKINGS: 'bookings',
  MECHANICS: 'mechanics',
  CUSTOMERS: 'customers',
  INVOICES: 'invoices',
  JOB_CARDS: 'jobCards'
};

/**
 * Strip undefined values recursively before writing to Firestore
 */
const sanitizeForFirestore = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const clean: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      clean[key] = value;
    }
  });
  return clean;
};

/**
 * Seed initial sample records into Firestore ONLY if the collections are completely empty
 */
export const seedInitialDataIfEmpty = async () => {
  try {
    const bookingsSnap = await getDocs(collection(db, COLLECTIONS.BOOKINGS));
    if (bookingsSnap.empty) {
      console.log('[Persistence] Seeding initial bookings to Firestore...');
      for (const b of INITIAL_BOOKINGS) {
        await setDoc(doc(db, COLLECTIONS.BOOKINGS, b.id), sanitizeForFirestore(b));
      }
    }

    const mechanicsSnap = await getDocs(collection(db, COLLECTIONS.MECHANICS));
    if (mechanicsSnap.empty) {
      console.log('[Persistence] Seeding initial mechanics to Firestore...');
      for (const m of INITIAL_MECHANICS) {
        await setDoc(doc(db, COLLECTIONS.MECHANICS, m.id), sanitizeForFirestore(m));
      }
    }

    const invoicesSnap = await getDocs(collection(db, COLLECTIONS.INVOICES));
    if (invoicesSnap.empty) {
      for (const inv of INITIAL_INVOICES) {
        await setDoc(doc(db, COLLECTIONS.INVOICES, inv.invoiceNumber), sanitizeForFirestore(inv));
      }
    }

    const jobCardsSnap = await getDocs(collection(db, COLLECTIONS.JOB_CARDS));
    if (jobCardsSnap.empty) {
      for (const jc of INITIAL_JOB_CARDS) {
        await setDoc(doc(db, COLLECTIONS.JOB_CARDS, jc.jobCardNumber), sanitizeForFirestore(jc));
      }
    }
  } catch (error) {
    console.warn('[Persistence Notice] Seed check skipped or offline:', error);
  }
};

/**
 * Save a new booking permanently to BOTH LocalStorage and Firestore
 */
export const saveBookingPermanently = async (booking: Booking): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_bookings');
    const existing: Booking[] = saved ? JSON.parse(saved) : [];
    const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
    localStorage.setItem('yesbike_admin_bookings', JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }

  try {
    await setDoc(doc(db, COLLECTIONS.BOOKINGS, booking.id), sanitizeForFirestore(booking));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.BOOKINGS}/${booking.id}`);
  }
};

/**
 * Update arbitrary booking fields permanently (LocalStorage + Firestore)
 */
export const updateBookingPermanently = async (
  bookingId: string,
  updates: Partial<Booking>
): Promise<void> => {
  let mergedBooking: Booking | null = null;
  try {
    const saved = localStorage.getItem('yesbike_admin_bookings');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      const updated = parsed.map((b) => {
        if (b.id !== bookingId) return b;
        mergedBooking = { ...b, ...updates };
        return mergedBooking;
      });
      localStorage.setItem('yesbike_admin_bookings', JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  try {
    const payload = sanitizeForFirestore({ ...updates, id: bookingId });
    await setDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId), payload, { merge: true });
  } catch (error) {
    console.warn('[Persistence] Could not update booking in Firestore:', error);
  }
};

/**
 * Delete booking permanently (LocalStorage + Firestore)
 */
export const deleteBookingPermanently = async (bookingId: string): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_bookings');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      localStorage.setItem(
        'yesbike_admin_bookings',
        JSON.stringify(parsed.filter((b) => b.id !== bookingId))
      );
    }
  } catch {
    // ignore
  }

  try {
    await deleteDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId));
  } catch (error) {
    console.warn('[Persistence] Could not delete booking in Firestore:', error);
  }
};

/**
 * Update booking status permanently (LocalStorage + Firestore including audit history)
 */
export const updateBookingStatusPermanently = async (
  bookingId: string,
  newStatus: BookingStatus,
  note?: string,
  updatedBy = 'Admin'
): Promise<void> => {
  const newHistoryEntry = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: newStatus,
    note: note || `Status changed to ${newStatus.replace(/_/g, ' ')}`,
    updatedBy
  };

  let updatedHistory: Booking['history'] | undefined;

  try {
    const saved = localStorage.getItem('yesbike_admin_bookings');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      const updated = parsed.map((b) => {
        if (b.id !== bookingId) return b;
        updatedHistory = [...(b.history || []), newHistoryEntry];
        return {
          ...b,
          status: newStatus,
          isNew: false,
          history: updatedHistory
        };
      });
      localStorage.setItem('yesbike_admin_bookings', JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  try {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
    const firestorePatch: Record<string, any> = {
      status: newStatus,
      isNew: false
    };
    if (updatedHistory) {
      firestorePatch.history = updatedHistory;
    }
    await updateDoc(docRef, firestorePatch);
  } catch (error) {
    console.warn('[Persistence] Could not update status in Firestore:', error);
  }
};

/**
 * Assign mechanic to a booking permanently (LocalStorage + Firestore)
 */
export const assignMechanicPermanently = async (
  bookingId: string,
  mechanic: Mechanic
): Promise<void> => {
  const historyEntry = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'mechanic_assigned' as BookingStatus,
    note: `Assigned to mechanic ${mechanic.name} (${mechanic.phone})`,
    updatedBy: 'Admin'
  };

  let updatedHistory: Booking['history'] | undefined;

  try {
    const saved = localStorage.getItem('yesbike_admin_bookings');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      const updated = parsed.map((b) => {
        if (b.id !== bookingId) return b;
        updatedHistory = [...(b.history || []), historyEntry];
        return {
          ...b,
          mechanicId: mechanic.id,
          mechanicName: mechanic.name,
          status: 'mechanic_assigned' as BookingStatus,
          isNew: false,
          history: updatedHistory
        };
      });
      localStorage.setItem('yesbike_admin_bookings', JSON.stringify(updated));
    }

    const savedMechs = localStorage.getItem('yesbike_admin_mechanics');
    if (savedMechs) {
      const parsedMechs: Mechanic[] = JSON.parse(savedMechs);
      const updatedMechs = parsedMechs.map((m) =>
        m.id === mechanic.id ? { ...m, status: 'on_job' as const, activeBookingId: bookingId } : m
      );
      localStorage.setItem('yesbike_admin_mechanics', JSON.stringify(updatedMechs));
    }
  } catch {
    // ignore
  }

  try {
    const bookingRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
    const patch: Record<string, any> = {
      mechanicId: mechanic.id,
      mechanicName: mechanic.name,
      status: 'mechanic_assigned',
      isNew: false
    };
    if (updatedHistory) {
      patch.history = updatedHistory;
    }
    await updateDoc(bookingRef, patch);

    const mechRef = doc(db, COLLECTIONS.MECHANICS, mechanic.id);
    await setDoc(
      mechRef,
      sanitizeForFirestore({
        ...mechanic,
        status: 'on_job',
        activeBookingId: bookingId
      }),
      { merge: true }
    );
  } catch (error) {
    console.warn('[Persistence] Could not update assignment in Firestore:', error);
  }
};

/**
 * Save or update a mechanic permanently
 */
export const saveMechanicPermanently = async (mechanic: Mechanic): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_mechanics');
    const existing: Mechanic[] = saved ? JSON.parse(saved) : [];
    const exists = existing.some((m) => m.id === mechanic.id);
    const updated = exists
      ? existing.map((m) => (m.id === mechanic.id ? mechanic : m))
      : [mechanic, ...existing];
    localStorage.setItem('yesbike_admin_mechanics', JSON.stringify(updated));
  } catch {
    // ignore
  }

  try {
    await setDoc(doc(db, COLLECTIONS.MECHANICS, mechanic.id), sanitizeForFirestore(mechanic));
  } catch (error) {
    console.warn('[Persistence] Could not save mechanic in Firestore:', error);
  }
};

/**
 * Update a mechanic's fields permanently
 */
export const updateMechanicPermanently = async (
  mechanicId: string,
  updates: Partial<Mechanic>
): Promise<void> => {
  let fullMech: Mechanic | null = null;
  try {
    const saved = localStorage.getItem('yesbike_admin_mechanics');
    if (saved) {
      const existing: Mechanic[] = JSON.parse(saved);
      const updated = existing.map((m) => {
        if (m.id !== mechanicId) return m;
        fullMech = { ...m, ...updates };
        return fullMech;
      });
      localStorage.setItem('yesbike_admin_mechanics', JSON.stringify(updated));
    }
  } catch {
    // ignore
  }

  try {
    if (fullMech) {
      await setDoc(doc(db, COLLECTIONS.MECHANICS, mechanicId), sanitizeForFirestore(fullMech), {
        merge: true
      });
    } else {
      await updateDoc(doc(db, COLLECTIONS.MECHANICS, mechanicId), sanitizeForFirestore(updates));
    }
  } catch (error) {
    console.warn('[Persistence] Could not update mechanic in Firestore:', error);
  }
};

/**
 * Delete a mechanic permanently
 */
export const deleteMechanicPermanently = async (mechanicId: string): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_mechanics');
    if (saved) {
      const existing: Mechanic[] = JSON.parse(saved);
      localStorage.setItem(
        'yesbike_admin_mechanics',
        JSON.stringify(existing.filter((m) => m.id !== mechanicId))
      );
    }
  } catch {
    // ignore
  }

  try {
    await deleteDoc(doc(db, COLLECTIONS.MECHANICS, mechanicId));
  } catch (error) {
    console.warn('[Persistence] Could not delete mechanic in Firestore:', error);
  }
};

/**
 * Save or update an invoice permanently
 */
export const saveInvoicePermanently = async (invoice: Invoice): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_invoices');
    const existing: Invoice[] = saved ? JSON.parse(saved) : [];
    const exists = existing.some((i) => i.invoiceNumber === invoice.invoiceNumber);
    const updated = exists
      ? existing.map((i) => (i.invoiceNumber === invoice.invoiceNumber ? invoice : i))
      : [invoice, ...existing];
    localStorage.setItem('yesbike_admin_invoices', JSON.stringify(updated));
  } catch {
    // ignore
  }

  try {
    await setDoc(
      doc(db, COLLECTIONS.INVOICES, invoice.invoiceNumber),
      sanitizeForFirestore(invoice)
    );
  } catch (error) {
    console.warn('[Persistence] Could not save invoice in Firestore:', error);
  }
};

/**
 * Save or update a job card permanently
 */
export const saveJobCardPermanently = async (jobCard: JobCard): Promise<void> => {
  try {
    const saved = localStorage.getItem('yesbike_admin_jobcards');
    const existing: JobCard[] = saved ? JSON.parse(saved) : [];
    const exists = existing.some((j) => j.jobCardNumber === jobCard.jobCardNumber);
    const updated = exists
      ? existing.map((j) => (j.jobCardNumber === jobCard.jobCardNumber ? jobCard : j))
      : [jobCard, ...existing];
    localStorage.setItem('yesbike_admin_jobcards', JSON.stringify(updated));
  } catch {
    // ignore
  }

  try {
    await setDoc(
      doc(db, COLLECTIONS.JOB_CARDS, jobCard.jobCardNumber),
      sanitizeForFirestore(jobCard)
    );
  } catch (error) {
    console.warn('[Persistence] Could not save job card in Firestore:', error);
  }
};

/**
 * Save customer permanently
 */
export const saveCustomerPermanently = async (customer: Customer): Promise<void> => {
  try {
    await setDoc(doc(db, COLLECTIONS.CUSTOMERS, customer.id), sanitizeForFirestore(customer));
  } catch (error) {
    console.warn('[Persistence] Could not save customer in Firestore:', error);
  }
};

/**
 * Real-time listener for Bookings collection
 */
export const subscribeToBookings = (callback: (bookings: Booking[]) => void) => {
  const q = query(collection(db, COLLECTIONS.BOOKINGS));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as Booking);
        list.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        callback(list);
      }
    },
    (error) => {
      console.warn('[Firestore Bookings Listener Notice]:', error.message);
    }
  );
};

/**
 * Real-time listener for Mechanics collection
 */
export const subscribeToMechanics = (callback: (mechanics: Mechanic[]) => void) => {
  const q = query(collection(db, COLLECTIONS.MECHANICS));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as Mechanic);
        callback(list);
      }
    },
    (error) => {
      console.warn('[Firestore Mechanics Listener Notice]:', error.message);
    }
  );
};

/**
 * Real-time listener for Invoices collection
 */
export const subscribeToInvoices = (callback: (invoices: Invoice[]) => void) => {
  const q = query(collection(db, COLLECTIONS.INVOICES));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as Invoice);
        callback(list);
      }
    },
    (error) => {
      console.warn('[Firestore Invoices Listener Notice]:', error.message);
    }
  );
};

/**
 * Real-time listener for Job Cards collection
 */
export const subscribeToJobCards = (callback: (jobCards: JobCard[]) => void) => {
  const q = query(collection(db, COLLECTIONS.JOB_CARDS));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => d.data() as JobCard);
        callback(list);
      }
    },
    (error) => {
      console.warn('[Firestore JobCards Listener Notice]:', error.message);
    }
  );
};
