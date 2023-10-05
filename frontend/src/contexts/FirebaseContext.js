import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, ref, set, get, child, update, onValue, push } from 'firebase/database';
import 'firebase/compat/app-check'
// project imports
import Loader from 'ui-component/Loader';

import { LOGIN, LOGOUT, FIREBASE_USER_UPDATE, 
    FIREBASE_INSERT_PRODUCT_DETAILS, FIREBASE_FETCH_PRODUCT_DETAILS,
    FIREBASE_INSERT_PRODUCT_IMAGES, FIREBASE_FETCH_PRODUCT_IMAGES } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { openSnackbar } from 'store/slices/snackbar';
import axios2 from 'utils/axios2';

// firebase initialize

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    });
}

// const
const initialState = {
    isLoggedIn: false,
    isLoadingProduct: true,
    isProfile: false,    
    isInitialized: false,
    dataProductDetails: [],
    dataProductImages: [],
    user: null
};

const db = getDatabase()
firebase.appCheck().activate('6LfjJ_onAAAAADe8dMnGPJBSVJtmIN8qNAaaKw59')
// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(
        () =>
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // console.log(user)
                    const dbRef = ref(db);
                    get(child(dbRef, 'users/' + user['_delegate']['uid']))
                    .then((snapshot) => {
                        if(snapshot.exists()){                            
                            set(ref(db, 'users/' + user['_delegate']['uid']), {
                                email: snapshot.val()['email'],
                                displayName: snapshot.val()['displayName'],
                                user_type: snapshot.val()['user_type'],
                                phone_number: snapshot.val()['phone_number'],
                                photo_url: snapshot.val()['photo_url'],
                                business_name: snapshot.val()['business_name'],
                                education_or_enterprise: snapshot.val()['education_or_enterprise'],
                                is_profile: snapshot.val()['is_profile'],
                                is_status: snapshot.val()['is_status'],
                                provider: snapshot.val()['provider'],
                                created_date: user['_delegate']['metadata']['createdAt'],
                                created_time: user['_delegate']['metadata']['creationTime'],
                                last_login_date: user['_delegate']['metadata']['lastLoginAt'],
                                last_login_time: user['_delegate']['metadata']['lastSignInTime'],
                            })

                            dispatch({
                                type: LOGIN,
                                payload: {
                                    isLoggedIn: true,
                                    isProfile: snapshot.val()['is_profile'],
                                    user: {
                                        id: user['_delegate']['uid'],
                                        email: user['_delegate']['displayName'],
                                        name: user['_delegate']['displayName'],
                                        user:snapshot.val()
                                    }
                                }
                            });
                        } else {
                            set(ref(db, 'users/' + user['_delegate']['uid']), {
                                email: user['_delegate']['email'],
                                displayName: user['_delegate']['displayName'],
                                user_type: 'trial',
                                phone_number: user['_delegate']['phoneNumber'] || '',
                                photo_url: user['_delegate']['photoURL'] || '',
                                business_name: '',
                                education_or_enterprise: '',
                                is_profile: false,
                                is_status: true,
                                provider: user['_delegate']['providerData'][0]['providerId'],
                                created_date: user['_delegate']['metadata']['createdAt'],
                                created_time: user['_delegate']['metadata']['creationTime'],
                                last_login_date: user['_delegate']['metadata']['lastLoginAt'],
                                last_login_time: user['_delegate']['metadata']['lastSignInTime'],
                            })

                            dispatch({
                                type: LOGIN,
                                payload: {
                                    isLoggedIn: true,
                                    isProfile: false,
                                    user: {
                                        id: user['_delegate']['uid'],
                                        email: user['_delegate']['displayName'],
                                        name: user['_delegate']['displayName'],
                                        user: {
                                            email: user['_delegate']['email'],
                                            displayName: user['_delegate']['displayName'],
                                            user_type: 'trial',
                                            phone_number: user['_delegate']['phoneNumber'] || '',
                                            photo_url: user['_delegate']['photoURL'] || '',
                                            business_name: '',
                                            education_or_enterprise: '',
                                            is_profile: false,
                                            is_status: true,
                                            provider: user['_delegate']['providerData'][0]['providerId'],
                                            created_date: user['_delegate']['metadata']['createdAt'],
                                            created_time: user['_delegate']['metadata']['creationTime'],
                                            last_login_date: user['_delegate']['metadata']['lastLoginAt'],
                                            last_login_time: user['_delegate']['metadata']['lastSignInTime'],
                                        }
                                    }
                                }
                            });
                        }
                    })                                                        
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch]
    );

    const firebaseEmailPasswordSignIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

    const firebaseGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const accessToken = credential.accessToken;
            const idToken = credential.idToken;
        })
        .catch((error) => {
            console.log(error)
        });
    };

    const firebaseMicrosoftSignIn = () => {
        const provider = new firebase.auth.OAuthProvider('microsoft.com');

        return firebase.auth().signInWithPopup(provider);
    };

    const firebaseRegister = async (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

    const logout = () => firebase.auth().signOut()
    .then(() => {
        setSession(null)
        dispatch({ type: LOGOUT })
    })
    .catch((err) => console.log(err));

    const resetPassword = async (email) => {
        await firebase.auth().sendPasswordResetEmail(email);
    };

    const updateProfile = () => {};
    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    const userUpdate = (uid, displayName, email, business_name, phone_number, education_or_enterprise) => {
        const updates = {
            displayName,            
            phone_number,
            business_name,
            education_or_enterprise,
            email,
            is_profile: true,      
        };
        
        update(ref(db, 'users/' + uid),updates)
        dispatch({
            type: FIREBASE_USER_UPDATE,
            payload: {
                isProfile: true,
            }
        });
    }

    const insertProductDetails = async (data,source,main_category) => {
        // console.log(data)        
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("jwtToken"),
            fingerprint: "123456",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
          };

        // console.log(data)

        const formData = new FormData()
        formData.append('data', JSON.stringify(data['all']))  
        formData.append('source', source)  
        formData.append('main_category', main_category)          
        // console.log(typeof data['all'])

        await axios2
        .post(`/products/insert`, formData, {
        //params: params,
        headers: headers
        })
        .then(res => {
            // console.log(res)
            dispatch({
                type: FIREBASE_INSERT_PRODUCT_DETAILS,
                payload: {
                    dataProductDetails: res.data,
                    isLoadingProduct: false,
                }
            });
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        // callback(res.data);
      })
      .catch(console.log);                       
    }

    const fetchProductDetails = async (source,main_category) => {
        // console.log(data)        
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("jwtToken"),
            fingerprint: "123456",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
          };

        const formData = new FormData()
        formData.append('source', source)  
        formData.append('main_category', main_category)          
  
        await axios2
        .post(`/products/fetch`, formData, {
        //params: params,
        headers: headers
        })
        .then(res => {
            // console.log(res)
            dispatch({
                type: FIREBASE_FETCH_PRODUCT_DETAILS,
                payload: {
                    dataProductDetails: res.data,
                    isLoadingProduct: false
                }
            });         
      })
      .catch(console.log);                       
    }

    const insertProductImages = async (data,source,main_category) => {
        // console.log(data)        
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("jwtToken"),
            fingerprint: "123456",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
          };

        // console.log(data)

        const formData = new FormData()
        formData.append('data', JSON.stringify(data['all']))  
        formData.append('source', source)  
        formData.append('main_category', main_category)          
        // console.log(typeof data['all'])

        await axios2
        .post(`/images/insert`, formData, {
        //params: params,
        headers: headers
        })
        .then(res => {
            // console.log(res)
            dispatch({
                type: FIREBASE_INSERT_PRODUCT_IMAGES,
                payload: {
                    dataProductImages: res.data,
                    isLoadingProduct: false,
                }
            });
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        // callback(res.data);
      })
      .catch(console.log);                       
    }

    const fetchProductImages = async (source,main_category) => {
        // console.log(data)        
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("jwtToken"),
            fingerprint: "123456",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
          };

        const formData = new FormData()
        formData.append('source', source)  
        formData.append('main_category', main_category)          
  
        await axios2
        .post(`/images/fetch`, formData, {
        //params: params,
        headers: headers
        })
        .then(res => {
            // console.log(res)
            dispatch({
                type: FIREBASE_FETCH_PRODUCT_IMAGES,
                payload: {
                    dataProductImages: res.data,
                    isLoadingProduct: false
                }
            });         
      })
      .catch(console.log);                       
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseRegister,
                firebaseEmailPasswordSignIn,
                login: () => {},
                firebaseGoogleSignIn,
                firebaseMicrosoftSignIn,
                logout,
                resetPassword,
                updateProfile,
                userUpdate,
                insertProductDetails,
                fetchProductDetails,
                insertProductImages,
                fetchProductImages
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node
};

export default FirebaseContext;
