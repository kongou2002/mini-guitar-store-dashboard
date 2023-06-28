// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'charts',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Staffs',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'category',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Product',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  // {
  //   title: 'CV Request',
  //   path: '/dashboard/request',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'New Job',
  //   path: '/newJob',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
  // {
  //   title: 'Interview',
  //   path: '/dashboard/interview',
  //   icon: getIcon('bxs:message-alt-check'),
  // },
  {
    title: 'Customer',
    path: '/dashboard/staffs',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'Final Result',
  //   path: '/dashboard/hrmanager',
  //   icon: getIcon('bxs:message-alt-check'),
  // },
];

export default navConfig;
