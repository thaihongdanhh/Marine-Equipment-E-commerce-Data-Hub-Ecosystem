// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconChartArcs, IconBorderAll, IconClipboardList } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconChartArcs,
    IconBorderAll,
    IconClipboardList
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const datasource = {
    id: 'data-source',
    title: <FormattedMessage id="data-source" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'overview',
            title: <FormattedMessage id="overview" />,
            type: 'item',
            url: '/datasource/overview',
            icon: icons.IconChartArcs,
            breadcrumbs: false
        },
        {
            id: 'tables',
            title: <FormattedMessage id="tables" />,
            type: 'collapse',
            url: '/datasource/tables',
            icon: icons.IconBorderAll,
            breadcrumbs: false,
            children: [
                {
                    id: 'amazon',
                    title: <FormattedMessage id="amazon" />,
                    type: 'collapse',
                    url: '/datasource/tables/amazon',
                    children: [
                        {
                            id: 'productdetails',
                            title: <FormattedMessage id="productdetails" />,
                            type: 'item',
                            url: '/datasource/tables/amazon/products',
                        },
                        {
                            id: 'productimages',
                            title: <FormattedMessage id="productimages" />,
                            type: 'item',
                            url: '/datasource/tables/amazon/images',
                        }
                    ]
                },
                {
                    id: 'alibaba',
                    title: <FormattedMessage id="alibaba" />,
                    type: 'collapse',
                    url: '/datasource/tables/alibaba',
                    children: [
                        {
                            id: 'productdetails',
                            title: <FormattedMessage id="productdetails" />,
                            type: 'item',
                            url: '/datasource/tables/alibaba/products',
                        },
                        {
                            id: 'productimages',
                            title: <FormattedMessage id="productimages" />,
                            type: 'item',
                            url: '/datasource/tables/alibaba/images',
                        }
                    ]
                },                
                {
                    id: 'svb24',
                    title: <FormattedMessage id="svb24" />,
                    type: 'collapse',
                    url: '/datasource/tables/svb24',
                    children: [
                        {
                            id: 'productdetails',
                            title: <FormattedMessage id="productdetails" />,
                            type: 'item',
                            url: '/datasource/tables/svb24/products',
                        },
                        {
                            id: 'productimages',
                            title: <FormattedMessage id="productimages" />,
                            type: 'item',
                            url: '/datasource/tables/svb24/images',
                        }
                    ]
                },
                {
                    id: 'westmarine',
                    title: <FormattedMessage id="westmarine" />,
                    type: 'collapse',
                    url: '/datasource/tables/westmarine',
                    children: [
                        {
                            id: 'productdetails',
                            title: <FormattedMessage id="productdetails" />,
                            type: 'item',
                            url: '/datasource/tables/westmarine/products',
                        },
                        {
                            id: 'productimages',
                            title: <FormattedMessage id="productimages" />,
                            type: 'item',
                            url: '/datasource/tables/westmarine/images',
                        }
                    ]
                }
            ]
        },
        {
            id: 'processes',
            title: <FormattedMessage id="processes" />,
            type: 'item',
            url: '/datasource/processes',
            icon: icons.IconClipboardList,
            breadcrumbs: false
        }
    ]
};

export default datasource;
