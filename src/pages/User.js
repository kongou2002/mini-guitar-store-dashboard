import { filter, first } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMember } from 'src/store/slice/memberSlice';
import EditUserForm from '../components/EditUserForm';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { toast } from 'react-toastify';
import axios from 'axios';
// mock

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Email', alignRight: false },
  { id: 'role', label: 'Phone', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'cv', label: 'Role', alignRight: false },
  { id: 'action', label: 'action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function User() {
  const { members } = useSelector((state) => state.members);
  const { staff } = useSelector((state) => state.staff);
  const navigate = useNavigate();
  useEffect(() => {
    if (staff.role !== 'admin') {
      navigate(-1);
    }
  }, [navigate, staff]);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'employee',
  });
  const [userEdit, setUserEdit] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'employee',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleDelete = (_id) => {
    axios
      .delete('http://localhost:8000/api/users/delete-by-admin', {
        data: { _id },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        toast(error.message);
      });

    toast('User deleted successfully');
    // Reset the form fields
    dispatch(getAllMember());
  };
  const handleSubmit = async (e) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/create-by-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, password: 123456 }),
      });

      if (response.ok) {
        console.log('User added successfully!');
        toast('User added successfully');
        // Reset the form fields
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: 'employee',
        });
      } else {
        console.log('Failed to add user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    dispatch(getAllMember());
  }, [user, dispatch, userEdit]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSave = async (updatedUser) => {
    // Perform the save operation, e.g., send a PUT request to the API
    try {
      const response = await fetch('http://localhost:8000/api/users/modify-by-admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Reset the form fields
        toast('Edit success');
        setOpenEditModal(false);
        setUserEdit({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: 'employee',
        });
      } else {
        console.log('Failed to modify user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setUserEdit(updatedUser);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

  const filteredUsers = applySortFilter(members, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <>
      <Page title="User">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              User list
            </Typography>
            <Button onClick={() => setOpen(true)} variant="contained">
              Add
            </Button>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={members?.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, email, lastName, firstName, phone, active, role, avatarUrl } = row;
                      const isItemSelected = selected.indexOf(email) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, email)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {lastName + ' ' + firstName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{email}</TableCell>
                          <TableCell align="center">{phone}</TableCell>
                          <TableCell align="center">{role}</TableCell>

                          {/* <TableCell align="center">{active}</TableCell> */}
                          <TableCell align="center">
                            <Box>
                              <Button
                                onClick={() => {
                                  handleDelete(row._id);
                                }}
                              >
                                <Label color="error">Delete</Label>
                              </Button>
                              <Button
                                onClick={() => {
                                  setOpenEditModal(true);
                                  setUserEdit(row);
                                }}
                              >
                                <Label color="warning">Edit</Label>
                              </Button>
                            </Box>
                          </TableCell>
                          {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={members?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add an user
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box>
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
                  <MenuItem value="sale_employees">Employee</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Add User
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} bgcolor="white" padding={4}>
          <Box>
            <EditUserForm user={userEdit} onSave={handleSave} />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
