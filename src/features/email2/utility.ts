import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import CreateIcon from '@mui/icons-material/Create';

export const sidebarItem = {
  compose: {
    label: 'Compose',
    url: `/email/compose`,
    labelIcon: CreateIcon,
    subItems: {}
  },
  inbox: {
    label: 'Inbox',
    url: `/email/inbox`,
    labelIcon: InboxIcon,
    subItems: {}
  }
};
