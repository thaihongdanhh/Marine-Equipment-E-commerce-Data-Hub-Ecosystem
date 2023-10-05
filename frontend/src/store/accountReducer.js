// action - state management
import { LOGIN, LOGOUT, REGISTER, FIREBASE_USER_UPDATE, 
    FIREBASE_INSERT_PRODUCT_DETAILS, FIREBASE_FETCH_PRODUCT_DETAILS,
    FIREBASE_INSERT_PRODUCT_IMAGES, FIREBASE_FETCH_PRODUCT_IMAGES
 } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload;            
            return {
                ...state,
                isLoggedIn: true,
                isProfile: user['user']['is_profile'],
                isInitialized: true,            
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case FIREBASE_USER_UPDATE: {
            const { isProfile } = action.payload;         
            return {
                ...state,
                isLoggedIn: true,
                isProfile,
            }
        }
        case FIREBASE_INSERT_PRODUCT_DETAILS: {
            const { dataProductDetails } = action.payload;         
            return {
                ...state,
                dataProductDetails
            }
        }
        case FIREBASE_FETCH_PRODUCT_DETAILS: {
            const { dataProductDetails } = action.payload;     
            return {
                ...state,
                dataProductDetails
            }
        }
        case FIREBASE_INSERT_PRODUCT_IMAGES: {
            const { dataProductImages } = action.payload;         
            return {
                ...state,
                dataProductImages
            }
        }
        case FIREBASE_FETCH_PRODUCT_IMAGES: {
            const { dataProductImages } = action.payload;     
            return {
                ...state,
                dataProductImages
            }
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
