import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditUserForm = ({ user: initialUser, onSave }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select name="role" value={user.role} onChange={handleChange}>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditUserForm;
