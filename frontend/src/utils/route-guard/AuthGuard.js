import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isLoggedIn, isProfile } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {               
        if (!isLoggedIn || isLoggedIn === null) {            
            navigate('login', { replace: true });
        } else if (!isProfile) {
            navigate('/user/account-profile/profile3', { replace: true })
        }
    }, [isLoggedIn,isProfile, navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
