import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Button } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo">
        {/* <Logo /> */}
        <Button style={{margin: 5, height: 75}} variant="contained" color="secondary">
            Marine Equipment <br/> E-commerce Data Hub ecosystem
        </Button>        
    </Link>
);

export default LogoSection;
