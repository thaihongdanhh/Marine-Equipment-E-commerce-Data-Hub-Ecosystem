import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// datasource routing
const DatasourceOverview = Loadable(lazy(() => import('views/datasource/Overview')));
const DatasourceTables = Loadable(lazy(() => import('views/datasource/Tables')));
const DatasourceProcesses = Loadable(lazy(() => import('views/datasource/Processes')));

const DatasourceTablesSvb24Product = Loadable(lazy(() => import('views/datasource/Tables/svb24')));
const DatasourceTablesSvb24Image = Loadable(lazy(() => import('views/datasource/Tables/svb24_images')));

const DatasourceTablesAmazonProduct = Loadable(lazy(() => import('views/datasource/Tables/amazon')));
const DatasourceTablesAmazonImage = Loadable(lazy(() => import('views/datasource/Tables/amazon_images')));

const DatasourceTablesWestmarineProduct = Loadable(lazy(() => import('views/datasource/Tables/westmarine')));
const DatasourceTablesWestmarineImage = Loadable(lazy(() => import('views/datasource/Tables/westmarine_images')));

const DatasourceTablesAlibabaProduct = Loadable(lazy(() => import('views/datasource/Tables/alibaba')));
const DatasourceTablesAlibabaImage = Loadable(lazy(() => import('views/datasource/Tables/alibaba_images')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [              
        {
            path: '/datasource/processes',
            element: <DatasourceProcesses />
        },
        {
            path: '/datasource/tables/svb24/products',
            element: <DatasourceTablesSvb24Product />
        },
        {
            path: '/datasource/tables/svb24/images',
            element: <DatasourceTablesSvb24Image />
        },
        {
            path: '/datasource/tables/amazon/products',
            element: <DatasourceTablesAmazonProduct />
        },
        {
            path: '/datasource/tables/amazon/images',
            element: <DatasourceTablesAmazonImage />
        },
        {
            path: '/datasource/tables/westmarine/products',
            element: <DatasourceTablesWestmarineProduct />
        },
        {
            path: '/datasource/tables/westmarine/images',
            element: <DatasourceTablesWestmarineImage />
        },
        {
            path: '/datasource/tables/alibaba/products',
            element: <DatasourceTablesAlibabaProduct />
        },
        {
            path: '/datasource/tables/alibaba/images',
            element: <DatasourceTablesAlibabaImage />
        },
        {
            path: '/datasource/overview',
            element: <DatasourceOverview />
        },
        {
            path: '/datasource/tables',
            element: <DatasourceTables />
        }
    ]
};

export default MainRoutes;
