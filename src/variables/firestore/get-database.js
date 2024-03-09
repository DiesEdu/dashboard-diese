// UserDatabase.js

import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export function UserDatabase() {
    const [allUser, setAllUser] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'user', 'userProfiles');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userProfile = docSnap.data().userDetails;
                    console.log('Document data:', userProfile);
                    setAllUser(userProfile);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return allUser;
}
