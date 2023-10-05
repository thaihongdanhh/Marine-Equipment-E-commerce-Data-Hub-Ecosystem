import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, Divider } from '@mui/material';

// project imports
import MarketShareAreaChartCard from './MarketShareAreaChartCard';
import MarketShareAreaChartCard2 from './MarketShareAreaChartCard2';
import TotalRevenueCard from './TotalRevenueCard';
import LatestCustomerTableCard from './LatestCustomerTableCard';
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
import UserCountCard from 'ui-component/cards/UserCountCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconShare, IconAccessPoint, IconCircles, IconCreditCard } from '@tabler/icons';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

import 'react-chat-elements/dist/main.css'
// MessageBox component
import { MessageBox, ChatItem  } from 'react-chat-elements'


// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const [showBot, toggleBot] = useState(false);
    const blockSX = {
        p: 0.75,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    return (
        <Grid container spacing={gridSpacing}>            
            <Grid item xs={12} lg={8} md={6}>
                <Grid container spacing={gridSpacing}>                    
                    <Grid item xs={12}>
                        <MarketShareAreaChartCard />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Items Quantity"
                            secondary="683"
                            content="Amazon"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Items Quantity"
                            secondary="8053"
                            content="Alibaba"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Items Quantity"
                            secondary="19828"
                            content="SVB24"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Items Quantity"
                            secondary="3811"
                            content="West Marine"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <LatestCustomerTableCard title="Latest Customers" />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>                        
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}
                            
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">Alibaba</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                944
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1046
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                665
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                5398
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">Amazon</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                196
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                133
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                303
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                51
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">SVB24</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                5409
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1940
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                6159
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                6320
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">West Marine</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                950
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                537
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1818
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                506
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TotalRevenueCard title="Total Revenue" />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily user"
                            secondary="1,658"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily page view"
                            secondary="1K"
                            iconPrimary={DescriptionTwoToneIcon}
                            color={theme.palette.primary.main}
                        />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12} lg={8} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MarketShareAreaChartCard2 />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Images Quantity"
                            secondary="2740"
                            content="Amazon"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Images Quantity"
                            secondary="2852"
                            content="Alibaba"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Images Quantity"
                            secondary="5460"
                            content="SVB24"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Images Quantity"
                            secondary="2103"
                            content="West Marine"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <LatestCustomerTableCard title="Latest Customers" />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                    <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">Alibaba</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                669
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                759
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                714
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                710
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">Amazon</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                639
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                571
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1292
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                238
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">SVB24</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>
                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1219
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                1476
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                724
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                2041
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                        <MainCard
                            content={false}                           
                            sx={{
                                '& svg': {
                                    width: 50,
                                    height: 50,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '14px',
                                    p: 1.25,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                                }
                            }}

                            style={{
                                marginTop: 12
                            }}
                        >
                            <Grid item xs={12} sm={6} sx={blockSX}>
                            <Typography variant="h4">West Marine</Typography>
                            </Grid>
                            
                            <Grid container alignItems="center" spacing={0}>                            
                                <Grid item xs={12} sm={6} sx={blockSX}>                                                                    
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >                                        
                                        <Grid item>
                                            <IconShare stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                541
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Hull
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconAccessPoint stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                657
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Engine
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCircles stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                0
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Electrical and Electronic
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={blockSX}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent={matchDownXs ? 'space-between' : 'center'}
                                    >
                                        <Grid item>
                                            <IconCreditCard stroke={1.5} />
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h5" align="center">
                                                905
                                            </Typography>
                                            <Typography variant="subtitle2" align="center">
                                                Ship rig / Outfit
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TotalRevenueCard title="Total Revenue" />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily user"
                            secondary="1,658"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserCountCard
                            primary="Daily page view"
                            secondary="1K"
                            iconPrimary={DescriptionTwoToneIcon}
                            color={theme.palette.primary.main}
                        />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Analytics;
