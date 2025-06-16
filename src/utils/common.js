import {
  Person,
  Work,
  AssignmentTurnedIn,
  ExitToApp,
  School,
  Business,
} from '@mui/icons-material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const studentNavLinks = [
  {
    label: 'Profile',
    icon: <Person />,
    path: '/student-profile',
  },
  {
    label: 'Jobs',
    icon: <Work />,
    path: '/student-jobs-list',
  },
  {
    label: 'Applied Jobs',
    icon: <AssignmentTurnedIn />,
    path: '/student-applied-jobs',
  },
  {
    label: 'Logout',
    icon: <ExitToApp />,
    path: '/signin',
  },
];

export const collegeNavLinks = [
  { label: 'Profile', icon: <Person />, path: '/college-staff' },
  {
    label: 'Students List',
    icon: <School />,
    path: '/college-student-details',
  },
  {
    label: 'Companies List',
    icon: <Business />,
    path: '/college-company-details',
  },
  {
    label: 'Students Applied Jobs',
    icon: <Work />,
    path: '/college-students-applied-jobs',
  },
  {
    label: 'Logout',
    icon: <ExitToApp />,
    path: '/signin',
  },
];

export const companyNavLinks = [
  { label: 'Profile', icon: <Person />, path: '/company' },
  {
    label: 'Create Job Posts',
    icon: <WorkOutlineIcon />,
    path: '/company-create-job-posts',
  },
  {
    label: 'Job Applications',
    icon: <AssignmentTurnedInIcon />,
    path: '/company-job-applications',
  },
  {
    label: 'Logout',
    icon: <ExitToApp />,
    path: '/signin',
  },
];
