import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';

export const getSideBarItems = () => {
  return {
    list: {
      label: 'List',
      url: `/email-templates`,
      labelIcon: ListAltIcon,
      subItems: {}
    },
    createMSA: {
      label: 'Create Email emplates',
      url: `/email-templates/create`,
      labelIcon: CreateIcon,
      subItems: {}
    }
  };
};

export const getSideBarItems2 = (email_template_id: string) => {
  return {
    view: {
      label: 'View',
      url: `/email-templates/${email_template_id}/view`,
      labelIcon: ListAltIcon,
      subItems: {}
    },
    edit: {
      label: 'Edit',
      url: `/email-templates/${email_template_id}/edit`,
      labelIcon: CreateIcon,
      subItems: {}
    }
  };
};
