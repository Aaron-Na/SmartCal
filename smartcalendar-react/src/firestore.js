import { doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

// Create or update user profile when they first log in
export const createUserProfile = async (user) => {
    try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        // Only create profile if it doesn't exist
        if (!userDoc.exists()) {
            await setDoc(userRef, {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date(),
                lastLogin: new Date()
            });
            console.log('User profile created');
        } else {
            // Update last login
            await updateDoc(userRef, {
                lastLogin: new Date()
            });
            console.log('User profile updated');
        }
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
};

// Save an assignment for a user
export const saveAssignment = async (userId, assignment) => {
    try {
        const assignmentsRef = collection(db, 'users', userId, 'assignments');
        const docRef = await addDoc(assignmentsRef, {
            ...assignment,
            createdAt: new Date(),
            completed: false
        });
        console.log('Assignment saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving assignment:', error);
    }
};

// Get all assignments for a user
export const getUserAssignments = async (userId) => {
    try {
        const assignmentsRef = collection(db, 'users', userId, 'assignments');
        const querySnapshot = await getDocs(assignmentsRef);
        const assignments = [];
        
        querySnapshot.forEach((doc) => {
            assignments.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log('Retrieved assignments:', assignments.length);
        return assignments;
    } catch (error) {
        console.error('Error getting assignments:', error);
        return [];
    }
};

// Save a calendar event for a user
export const saveEvent = async (userId, event) => {
    try {
        const eventsRef = collection(db, 'users', userId, 'events');
        const docRef = await addDoc(eventsRef, {
            ...event,
            createdAt: new Date()
        });
        console.log('Event saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving event:', error);
    }
};

// Get all events for a user
export const getUserEvents = async (userId) => {
    try {
        const eventsRef = collection(db, 'users', userId, 'events');
        const querySnapshot = await getDocs(eventsRef);
        const events = [];
        
        querySnapshot.forEach((doc) => {
            events.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log('Retrieved events:', events.length);
        return events;
    } catch (error) {
        console.error('Error getting events:', error);
        return [];
    }
};

// Mark assignment as completed
export const completeAssignment = async (userId, assignmentId) => {
    try {
        const assignmentRef = doc(db, 'users', userId, 'assignments', assignmentId);
        await updateDoc(assignmentRef, {
            completed: true,
            completedAt: new Date()
        });
        console.log('Assignment marked as completed');
    } catch (error) {
        console.error('Error completing assignment:', error);
    }
};