import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/database';
import 'firebase/compat/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {firebaseConfig} from '../firebase.config';
import { getStorage } from "firebase/storage";
import {toast} from 'react-toastify';




//**************** */ context *******************
const AuthContext = createContext();

//***************** Fire base Initialization ************************
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);

 var db = app.firestore();
export {db};

export const AuthProvider = (props) => {
	const auth = Auth();
	return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
};



export const useAuth = () => useContext(AuthContext);

//***************** Redirect review item to signIn ************************
export const PrivateRoute = ({ children, ...rest }) => {
	const auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
					children
				  ) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
	);
};

// redirects to admin login 
export const PrivateAdminRoute = ({ children, ...rest }) => {
	const auth = useAuth();
	return (
		<Route
			{...rest}
			  render={({ location }) =>
				auth.user  ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/admin',
							state: { from: location }
						}}
					/>
				)}
	     	/>
	);
};

export const getUser = (user) => {
	const { email, displayName, photoURL } = user;
	return { email, name: displayName, photo: photoURL };
};


export const resetPassword = (email) => {
	var auth = firebase.auth();
     auth
		.sendPasswordResetEmail(email)
		.then(function() {
			toast("check your inbox or spam to reset password")
		})
		.catch(function(error) {
			toast(error.message.split(":")[1])
		});
};

export const resendverificationEmail = () => {
	var user = firebase.auth().currentUser;
	user
		.sendEmailVerification()
		.then(function() {
			return(toast("check your inbox or spam to verify email"));
		
		})
		.catch(function(error) {	
			return (toast.error(error.message.split(":")[1]))
			
		});
};

const Auth = () => {
	const [user, setUser ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				const currentUser = user;
				setUser(currentUser);
			}
		});
	}, []);


	 const verifyEmail = () => {
		var user = firebase.auth().currentUser;
		user
			.sendEmailVerification()
			.then(function() {
				return(toast("email sent"));
			
			})
			.catch(function(error) {	
				return (toast.error(error.message.split(":")[1]))
				
			});
	};

	//***************** sign in with popup Start ************************
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		return firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				const signedInUser = getUser(result.user);
				setUser(signedInUser);
				window.history.back();
				return result.user;
			})
			.catch((error) => {
				setUser(null);
				return error.message;
			});
	};

	const signInWithFacebook = () => {
		const fbProvider = new firebase.auth.FacebookAuthProvider();
		return firebase
			.auth()
			.signInWithPopup(fbProvider)
			.then((result) => {
				var token = result.credential.accessToken;
				const fbSignedInUser = getUser(result.user);
				setUser(fbSignedInUser);
				window.history.back();
				return result.user;
			})
			.catch(function(error) {
				setUser(null);
				return (toast.error(error.message.split(":")[1]));
			});
	};


    const signIn = (email, password) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				setUser(result.user);
				toast("login successful");			
				window.location.replace("/");	
			  })
			  .catch((error) => {			
				setUser(null);			
				return (
				toast(error.message.split(":")[1])
				)
			});
	};


	const signInAdmin = (email, password) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				setUser(result.user);
				toast("login successful");
				window.location.replace("/admin/dashboard");
			})
			.catch((error) => {
				setUser(null);
				return (toast.error(error.message));
			});
	};

	const signUp = (email, password, name) => {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase
					.auth()
					.currentUser.updateProfile({
						displayName: name
					})
					.then(() => {
						setUser(result.user);
						verifyEmail();
						window.location.replace("/");
						toast("signed up successfully")
					});
			})
			.catch((error) => {
				setUser(null);
				return (			
					toast.error(error.message.split(":")[1])				
				)				
			});
	};

	const signUpAdmin = (email, password, name) => {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase
					.auth()
					.currentUser.updateProfile({
						displayName: name
					})
					.then(() => {
						setUser(result.user);
						verifyEmail();
						window.location.replace("/admin/dashboard");
						toast("signed up successfully")
					});
			})
			.catch((error) => {
				setUser(null);
				return (			
					toast.error(error.message.split(":")[1])				
				)				
			});
	};

	const signOut = () => {
		return firebase
			.auth()
			.signOut()
			.then((result) => {
				setUser(null);
				return (toast("signed out successfully"));
				// return true;
					    
			})
			.catch((error) => {
				console.log(error);
				return (toast.error(error.message.split(":")[1]));
			});
	};

	return {
		user,
		signIn,
		signInAdmin,
		signUp,
		signOut,
		signInWithGoogle,
		signInWithFacebook,
		signUpAdmin
	};
};

export default Auth;