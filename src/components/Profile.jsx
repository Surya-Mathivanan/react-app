import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import Footer from "./Footer";// Assuming you have a CSS file for styling

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails({
            firstName: user.displayName || "User",
            email: user.email,
            photo:
              user.photoURL ||
              "https://i.pinimg.com/originals/38/8a/78/388a78de37fc7872ba21af5d2f1a7b6f.gif",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {loading ? (
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : userDetails ? (
        <>
          <div className="profile-header">
            <img className="profile-photo" 
              src={userDetails.photo}
              alt="Profile"
            />
            <h1>Welcome {userDetails.firstName} </h1>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="profile-details">
            <iframe className="i-frame" src="https://react.dev/learn" height={100} frameBorder="0"></iframe>
          </div>
          {/* <footer className="profile-footer">
            <p>© 2023 Your Company</p>
          </footer> */}
          <Footer />
        </>
      ) : (
        <p>No user data found.</p>
        
      )}
    </div>
  );
}

export default Profile;















         {/* <div>
            <img className="profile-photo" 
              src={userDetails.photo}
              alt="Profile"
            />
          </div>
          <h3>Welcome {userDetails.firstName}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button> */}