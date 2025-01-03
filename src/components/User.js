import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material';
import { toggleFlag } from '../store/action/calendarActions';
import AuthRedirect from '../customHook/AuthRedirect';
import { useNavigate } from 'react-router-dom';

const UserCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  AuthRedirect();
  const events = useSelector((state) => state.calendar.events);
  console.log(events);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setOpenModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleToggleFlag = () => {
    if (selectedEvent) {
      const newFlagValue = !selectedEvent.flag;
      dispatch(toggleFlag(selectedEvent.id, newFlagValue));
      setSelectedEvent({ ...selectedEvent, flag: newFlagValue });
    }
  };

  // Add className to flagged events
  const modifiedEvents = events.map((event) => ({
    ...event,
    className: event.flag ? 'flagged-event' : '', // Add custom class if flagged
  }));

  return (
    <div className="user-calendar-view">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Calendar View</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignOut}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#115293',
            },
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            height: '40px',
            width: '150px',
          }}
        >
          Sign Out
        </Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={modifiedEvents}
        eventClick={handleEventClick}
        eventClassNames={(arg) => (arg.event.extendedProps.flag ? 'flagged-event' : '')}
      />

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '500px',
            width: '100%',
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h6" component="h2" mb={2}>
                Event Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={selectedEvent.details.name || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={selectedEvent.details.location || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    value={selectedEvent.details.linkedIn || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Emails"
                    value={selectedEvent.details.emails || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Numbers"
                    value={selectedEvent.details.phoneNumbers || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Comments"
                    value={selectedEvent.details.comments || ''}
                    InputProps={{ readOnly: true }}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Communication Periodicity"
                    value={selectedEvent.details.periodicity || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color={selectedEvent.flag ? 'secondary' : 'primary'}
                  onClick={handleToggleFlag}
                >
                  {selectedEvent.flag ? 'Remove Flag' : 'Add Flag'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Add CSS for flagged events */}
      <style>
        {`
          .flagged-event {
            background-color: #ffcc00 !important; /* Warning color */
            color: #000 !important;
          }
        `}
      </style>
    </div>
  );
};

export default UserCalendar;
