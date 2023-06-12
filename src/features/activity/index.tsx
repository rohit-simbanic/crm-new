import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
import { moduleLabels, modules } from 'assets/list/tracker/constant';
import UnitCard from 'components/card';
import CircularLoader from 'components/dog-loader/dog-lodar';
import { DrawerComponent } from 'components/drawer';
import RouteLink from 'components/link/route-link';
import DateUtility from 'helpers/date-helper';
import LayoutProvider from 'pages/common-layout/layout-provider-context';
import React, { useContext, useEffect, useState } from 'react';
import trackerService from 'services/tracker-service';
import { ObjectType } from 'types';
import { v4 as uuid } from 'uuid';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import fieldLabel from 'assets/constants/fieldLabel';

const ActivityComponent = () => {
  const LayoutContext = useContext(LayoutProvider);

  const [loading, setLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState([]);

  const getItems = () => {
    return (
      <Box>
        {activities
          .filter((x: ObjectType) => modules.includes(x.module_name))
          .map((activity: ObjectType) => (
            <UnitCard
              key={uuid()}
              avatar={activity.module_name.substring(0, 2)}
              title={
                <RouteLink
                  url={`/${moduleLabels[activity.module_name].value}/${
                    activity.item_id
                  }/view`}
                  target={true}
                  name={
                    <Typography sx={{ fontWeight: 700 }}>
                      {activity.item_summary}
                    </Typography>
                  }
                />
              }
              subheader={DateUtility.getDateTimeString(
                new Date(activity.date_modified)
              )}
              action={
                <RouteLink
                  url={`/${moduleLabels[activity.module_name].value}/${
                    activity.item_id
                  }/edit`}
                  target={true}
                  style={{
                    padding: 1
                  }}
                  key={uuid()}
                  name={
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  }
                />
              }
              isLeft={1}
            />
          ))}
      </Box>
    );
  };

  const loadActivities = async () => {
    setLoading(true);
    const result = await trackerService.getList();
    setLoading(false);

    if (result.isSuccess) {
      setActivities(result.data.data);
    }
  };

  useEffect(() => {
    if (!LayoutContext.isRecentViewOpen) return;
    loadActivities();
  }, [LayoutContext.isRecentViewOpen]);

  return (
    <>
      <DrawerComponent
        anchor="right"
        open={LayoutContext.isRecentViewOpen}
        onClose={() => LayoutContext.toggleRecentView()}
      >
        <PaperBoxHeader
          value={fieldLabel.recentViewed}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: '9',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            paddingLeft: 0,
            paddingBottom: 2
          }}
        />
        <Box
          sx={{
            overflowY: 'auto',
            pr: 1
          }}
        >
          {loading ? <CircularLoader /> : getItems()}
        </Box>
      </DrawerComponent>
    </>
  );
};

export default ActivityComponent;
