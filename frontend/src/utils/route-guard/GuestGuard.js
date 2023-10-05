import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH, PROFILE_PATH } from 'config';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn, isProfile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if(isProfile){
                navigate(DASHBOARD_PATH, { replace: true });
            } else {
                navigate(PROFILE_PATH, {replace: true})
            }
            
        }
    }, [isLoggedIn,isProfile, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
