import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { AuthContext } from '../main';
import { auth } from '../services/firebase.init';


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authActionCount, setAuthActionCount] = useState(0); // Triggers useEffect
  const provider = new GoogleAuthProvider();

  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setAuthActionCount((prev) => prev + 1); // Trigger effect
          return user;
        });
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
        return res;
      })
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
      })
      .finally(() => setLoading(false));
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setAuthActionCount((prev) => prev + 1); // Trigger effect
      })
      .finally(() => setLoading(false));
  };

  const loginWithGoogle=()=>{
    setLoading(true);
    return signInWithPopup(auth,provider)
    .finally(() => setLoading(false));
  }

  const resetEmail=(email)=>{
    return sendPasswordResetEmail(auth,email);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [authActionCount]); 


  // data fetching part 



  const userData = {
    createUser,
    loginUser,
    signOutUser,
    updateUser,
    user,
    loading,
    loginWithGoogle,
    resetEmail
  };
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;