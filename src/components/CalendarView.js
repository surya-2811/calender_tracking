import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AuthRedirect from '../customHook/AuthRedirect';
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import {
  fetchEventsRequest,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../store/action/calendarActions';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  AuthRedirect();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
console.log(events)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '',
    flag: false, // Default value for the new key
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedEvent(null);
    setFormData({
      name: '',
      location: '',
      linkedIn: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: '',
      flag: false,
    });
    setOpenModal(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setFormData({
        name: event.details.name || '',
        location: event.details.location || '',
        linkedIn: event.details.linkedIn || '',
        emails: event.details.emails || '',
        phoneNumbers: event.details.phoneNumbers || '',
        comments: event.details.comments || '',
        periodicity: event.details.periodicity || '',
        flag: event.flag || false,
      });
      setSelectedDate(event.date);
      setOpenModal(true);
    }
  };

  const modifiedEvents = events.map((event) => ({
    ...event,
    className: event.flag ? 'flagged-event' : '', // Add custom class if flagged
  }));

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Company name is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.linkedIn.trim()) errors.linkedIn = 'LinkedIn profile is required';
    if (!formData.emails.trim()) errors.emails = 'At least one email is required';
    if (!formData.phoneNumbers.trim()) errors.phoneNumbers = 'Phone number is required';
    if (!formData.periodicity.trim()) errors.periodicity = 'Periodicity is required';
    return errors;
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (selectedEvent) {
      dispatch(
        updateEvent({
          ...selectedEvent,
          title: formData.name,
          date: selectedDate,
          details: formData,
          flag: formData.flag,
        })
      );
    } else {
      dispatch(
        addEvent({
          id: `${Date.now()}`,
          title: formData.name,
          date: selectedDate,
          status: 'due',
          details: formData,
          flag: formData.flag,
        })
      );
    }

    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
    }
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedEvent(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="calendar-view">
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
        dateClick={handleDateClick}
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
          <Typography variant="h6" component="h2" mb={2}>
            {selectedEvent ? 'Edit Event' : 'Add Event'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!formErrors.location}
                helperText={formErrors.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                error={!!formErrors.linkedIn}
                helperText={formErrors.linkedIn}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emails"
                name="emails"
                value={formData.emails}
                onChange={handleChange}
                error={!!formErrors.emails}
                helperText={formErrors.emails}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Numbers"
                name="phoneNumbers"
                value={formData.phoneNumbers}
                onChange={handleChange}
                error={!!formErrors.phoneNumbers}
                helperText={formErrors.phoneNumbers}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Communication Periodicity (e.g., every 2 weeks)"
                name="periodicity"
                value={formData.periodicity}
                onChange={handleChange}
                error={!!formErrors.periodicity}
                helperText={formErrors.periodicity}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            {selectedEvent && (
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Box display="flex" gap={2}>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
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

export default CalendarView;
