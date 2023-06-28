import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

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
  Popover,
  IconButton,
  MenuItem,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import Heatmap from 'src/sections/@dashboard/interview/Heatmap';
import InterviewModal from 'src/sections/@dashboard/interview/InterviewModal';
import KietInterviewModal from 'src/sections/@dashboard/interview/KietInterviewModal';
import InterviewerChip from 'src/sections/@dashboard/interview/InterviewerChip';
import InterviewerAssignModal from 'src/sections/@dashboard/interview/InterviewerAssignModal';
import InterviewModalEditor from 'src/sections/@dashboard/interview/InterviewModalEditor';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  // { id: 'company', label: 'ID Number', alignRight: false },
  { id: 'role', label: 'Job Title', alignRight: false },
  { id: 'isVerified', label: 'Resume', alignRight: false },
  { id: 'status', label: 'Booking Status', alignRight: false },
  { id: 'interviewers', label: 'Interviewers', alignRight: false },
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Interview() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isLoad, setIsLoad] = useState(0);

  const [open, setOpen] = useState(null);

  const [id, setId] = useState('');

  const handleLoad = () => {
    setIsLoad(isLoad + 1);
  };
  const handleOpenMenu = (event, candidateId) => {
    setOpen(event.currentTarget);
    setId(candidateId);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [candidates, setCandidates] = useState([]);
  React.useEffect(() => {
    async function fetchCandidate() {
      const data = await axios.get('http://localhost:8000/api/candidate/allV2');
      const candidates = data.data;
      setCandidates(candidates);
      // console.log(candidates);
    }
    fetchCandidate();
  }, [isLoad]);

  const users = [...Array(candidates.length)].map((_, index) => ({
    id: candidates[index]?.id,
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    name: candidates[index]?.member,
    company: candidates[index]?.identity_number,
    isVerified: candidates[index]?.resume_url,
    status: candidates[index]?.booking_status,
    role: candidates[index]?.job,
    hr_staff: candidates[index]?.hr_staff,
    address: candidates[index]?.address,
    dob: candidates[index]?.dob,
    identity_number: candidates[index]?.identity_number,
    phone: candidates[index]?.phone,
  }));

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleEditInterview = (event) => {};

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  // const [isOpen, setIsOpen] = useState(false);
  // const [id, setId] = useState();

  return (
    <Page title="Interview">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Round 2: Interview
          </Typography>
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
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      id,
                      name,
                      role,
                      status,
                      company,
                      avatarUrl,
                      isVerified,
                      hr_staff,
                      address,
                      dob,
                      identity_number,
                      phone,
                    } = row;
                    // console.log(row);
                    const isItemSelected = selected.indexOf(name) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        {/* <TableCell align="left">{company}</TableCell> */}
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="center">
                          <a
                            href={
                              isVerified !== '#'
                                ? isVerified
                                : `https://drive.google.com/file/d/1CokKuukOFgsanKxkTbpKAzYZOplZni28/view?usp=sharing`
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Iconify icon={'akar-icons:paper'} width={22} height={22} />
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {status === 'NO' ? (
                            <KietInterviewModal
                              candidate={row}
                              reloadData={() => {
                                handleLoad();
                              }}
                            />
                          ) : (
                            <Button>
                              <Label variant="ghost" color={(status === 'no' && 'error') || 'success'}>
                                {sentenceCase(status)}
                              </Label>
                            </Button>
                          )}
                        </TableCell>

                        {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
                        {status !== 'NO' ? (
                          <>
                            <TableCell align="center">
                              <InterviewerAssignModal infor={row} />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, id)}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </>
                        ) : (
                          <></>
                        )}
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3}>
          <Typography variant="h4" gutterBottom>
            Heat Map Chart
          </Typography>
        </Stack>
        <Heatmap isLoad={isLoad} />
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem onClick={handleEditInterview}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}
        <InterviewModalEditor candidateId={id} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Page>
  );
}
