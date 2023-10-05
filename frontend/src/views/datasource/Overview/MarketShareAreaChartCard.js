import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography } from '@mui/material';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import chartData from './chart-data/market-share-area-chart';
import chartData2 from './chart-data/market-share-area-chart2';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter, 
    IconBrandAmazon } from '@tabler/icons';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import AmazonLogo from '../../../assets/icons/Amazon.jpg'
import AlibabaLogo from '../../../assets/icons/Alibaba.png'
import SVBLogo from '../../../assets/icons/SVB-logo.png'
import WestMarineLogo from '../../../assets/icons/westmarine.jpg'

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const MarketShareAreaChartCard = () => {
    const theme = useTheme();

    const { navType } = useConfig();

    const secondaryMain = theme.palette.secondary.main;
    const errorMain = theme.palette.error.main;
    const primaryDark = theme.palette.primary.dark;
    const infoDark = theme.palette.info.dark;

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [secondaryMain, errorMain, primaryDark, infoDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };
        ApexCharts.exec(`market-share-area-chart`, 'updateOptions', newChartData);
    }, [navType, secondaryMain, errorMain, primaryDark]);

    return (
        <>
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
            <Box
                sx={{
                    p: 3
                }}
            >
                <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h3">Market Share</Typography>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                        {/* <Grid item>
                            <TrendingDownIcon fontSize="large" color="error" />
                        </Grid> */}
                        {/* <Grid item>
                            <Typography variant="h3">27, 695.65</Typography>
                        </Grid> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
                            Department wise products report
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent="space-around" alignItems="center" spacing={3}>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            color: theme.palette.secondary.main,
                                            borderRadius: '12px',
                                            padding: 1,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.secondary.light
                                        }}
                                    >
                                        <img src={AmazonLogo} style={{width: 35, justifyItems: "center"}} stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4"> 2.11%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.primary.main,
                                            borderRadius: '12px',
                                            padding: 1,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.primary.light
                                        }}
                                    >
                                        <img src={AlibabaLogo} style={{width: 25, justifyItems: "center"}} stroke={2} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4"> 24.87%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.error.main,
                                            borderRadius: '12px',
                                            padding: 0,
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffff'
                                        }}
                                    >
                                        <img src={SVBLogo} style={{width: 50, justifyItems: "center", paddingTop: 10}} stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4"> 61.24%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.error.main,
                                            borderRadius: '12px',
                                            padding: 0,
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffff'
                                        }}
                                    >
                                        <img src={WestMarineLogo} style={{width: 50, justifyItems: "center"}} stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4"> 11.77%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>                        
                        <Grid item xs zeroMinWidth />
                    </Grid>
                </Grid>
            </Box>
            <Chart {...chartData} />

            
        </MainCard>       
        </>
    );
};
export default MarketShareAreaChartCard;
