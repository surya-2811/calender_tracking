import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const CalendarView = () => {
  const defaultValue = [
    {
      id: '1',
      title: 'Email with Company A',
      date: '2024-12-01',
      status: 'completed',
      details: {
        name: 'Company A',
        location: 'New York',
        linkedIn: 'https://linkedin.com/company-a',
        emails: 'contact@companya.com',
        phoneNumbers: '1234567890',
        comments: 'Discuss contract terms.',
        periodicity: 'Monthly',
      },
    },
    {
      id: '2',
      title: 'Phone Call with Company B',
      date: '2024-12-05',
      status: 'due',
      details: {
        name: 'Company B',
        location: 'Los Angeles',
        linkedIn: 'https://linkedin.com/company-b',
        emails: 'info@companyb.com',
        phoneNumbers: '0987654321',
        comments: 'Follow up on project proposal.',
        periodicity: 'Bi-weekly',
      },
    },
  ]
  const [events, setEvents] = useState(defaultValue);
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedEvent(null); // Reset selectedEvent for new event
    setFormData({
      name: '',
      location: '',
      linkedIn: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: '',
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
      });
      setSelectedDate(event.date);
      setOpenModal(true);
    }
  };

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
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: formData.name,
                date: selectedDate,
                details: formData,
              }
            : event
        )
      );
    } else {
      // Add new event
      setEvents([
        ...events,
        {
          id: `${Date.now()}`, // Unique ID
          title: formData.name,
          date: selectedDate,
          status: 'due',
          details: formData,
        },
      ]);
    }

    handleClose();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
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

  return (
    <div className="calendar-view">
      <h1>Calendar View</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
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
    </div>
  );
};

export default CalendarView;
