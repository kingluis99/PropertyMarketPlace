import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { Property, ViewingRequest } from '../types';

export const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with configured databaseId
const databaseId = firebaseConfigData.firestoreDatabaseId || '(default)';
export const db = getFirestore(app, databaseId);

// Test Firestore connection on boot (Required by skill guidelines)
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Authentication helpers
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Persist / update user profile in Firestore
  if (user) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Client',
        photoURL: user.photoURL || '',
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('Could not sync user profile to firestore:', e);
    }
  }
  return user;
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function onAuthUserChanged(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Saved properties persistence in Firestore (/users/{userId}/savedProperties/{propertyId})
export async function savePropertyToFirestore(userId: string, property: Property) {
  const propertyRef = doc(db, 'users', userId, 'savedProperties', property.id);
  await setDoc(propertyRef, {
    id: property.id,
    userId,
    propertyId: property.id,
    propertyTitle: property.title,
    price: property.price,
    image: property.images[0] || '',
    area: property.area,
    savedAt: new Date().toISOString()
  });
}

export async function removePropertyFromFirestore(userId: string, propertyId: string) {
  const propertyRef = doc(db, 'users', userId, 'savedProperties', propertyId);
  await deleteDoc(propertyRef);
}

export function subscribeSavedProperties(
  userId: string, 
  onUpdate: (propertyIds: string[]) => void
) {
  const colRef = collection(db, 'users', userId, 'savedProperties');
  return onSnapshot(colRef, (snapshot) => {
    const ids = snapshot.docs.map(d => d.id);
    onUpdate(ids);
  }, (err) => {
    console.warn('Error reading saved properties:', err);
  });
}

// Viewing bookings persistence (/viewings/{viewingId})
export async function saveViewingBookingToFirestore(booking: ViewingRequest, userId?: string) {
  const bookingId = booking.id || `viewing-${Date.now()}`;
  const docRef = doc(db, 'viewings', bookingId);
  await setDoc(docRef, {
    id: bookingId,
    userId: userId || null,
    propertyId: booking.propertyId,
    propertyTitle: booking.propertyTitle,
    propertyAddress: booking.propertyAddress,
    date: booking.date,
    timeSlot: booking.timeSlot,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    notes: booking.notes || '',
    status: booking.status || 'confirmed',
    createdAt: new Date().toISOString()
  });
}

// Valuation requests persistence (/valuations/{valuationId})
export async function saveValuationToFirestore(valuationData: {
  postcode: string;
  bedrooms: number;
  propertyType: string;
  condition: string;
  estimatedValue: number;
  name: string;
  email: string;
  phone: string;
  userId?: string;
}) {
  const valuationId = `val-${Date.now()}`;
  const docRef = doc(db, 'valuations', valuationId);
  await setDoc(docRef, {
    id: valuationId,
    ...valuationData,
    userId: valuationData.userId || null,
    createdAt: new Date().toISOString()
  });
}

// User Lyria generated music tracks (/users/{userId}/soundtracks/{trackId})
export interface StoredSoundtrack {
  id: string;
  title: string;
  prompt: string;
  model: string;
  audioData: string; // base64
  mimeType: string;
  lyrics?: string;
  createdAt: string;
}

export async function saveSoundtrackToFirestore(userId: string, track: StoredSoundtrack) {
  const trackRef = doc(db, 'users', userId, 'soundtracks', track.id);
  await setDoc(trackRef, {
    ...track,
    userId,
    createdAt: track.createdAt || new Date().toISOString()
  });
}

export function subscribeSoundtracks(
  userId: string, 
  onUpdate: (tracks: StoredSoundtrack[]) => void
) {
  const colRef = collection(db, 'users', userId, 'soundtracks');
  return onSnapshot(colRef, (snapshot) => {
    const tracks = snapshot.docs.map(doc => doc.data() as StoredSoundtrack);
    tracks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    onUpdate(tracks);
  }, (err) => {
    console.warn('Error reading soundtracks:', err);
  });
}

export async function deleteSoundtrackFromFirestore(userId: string, trackId: string) {
  const trackRef = doc(db, 'users', userId, 'soundtracks', trackId);
  await deleteDoc(trackRef);
}
