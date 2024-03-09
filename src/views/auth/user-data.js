// In userData.js

import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export function UserData() {
    // Firebase login data details
    const [currentUser, setCurrentUser] = React.useState({});
    const [detailUser, setDetailUser] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "user", "userProfiles");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // console.log("Document data:", data);
                    const userProfile = data.userDetails;

                    const getUserByUUID = (uuid) => {
                        // console.log("---uuid: " + uuid);
                        for (const key in userProfile) {
                            if (userProfile[key].uuid === uuid) {
                                setDetailUser(userProfile[key]);
                                return [userProfile[key]];
                            }
                        }
                        return [];
                    };

                    const targetUUID = currentUser.uid;
                    // console.log("targetUUID: " + targetUUID);
                    const usersWithUUID = getUserByUUID(targetUUID);

                    if (usersWithUUID.length > 0) {
                        // console.log("Users found:", usersWithUUID);
                    } else {
                        // console.log("No users with UUID", targetUUID, "found");
                    }
                } else {
                    // docSnap.data() will be undefined in this case
                    // console.log("No such document!");
                }

            } catch (error) {
                // console.error('Error fetching data: ', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchData();
            } else {
                // User is signed out
            }
        });

        return () => {
            // Cleanup function
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentUser]);

    return detailUser;
}
