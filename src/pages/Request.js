import { filter } from 'lodash';
import { faker } from '@faker-js/faker';

import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

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
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { changeCandidateStatus, getCandidateByStaff } from 'src/store/slice/candidateSlice';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'jobtitle', label: 'Job title', alignRight: false },
  //   { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'cv', label: 'Resume', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];
const TABLE_HEAD_STATUS = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'jobtitle', label: 'Job title', alignRight: false },
  //   { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'cv', label: 'Resume', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
    return filter(array, (_user) => _user.member_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function Request() {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);
  const { notification } = useSelector((state) => state.notification);
  const { candidates } = useSelector((state) => state.candidates);
  const { staff } = useSelector((state) => state.staff);
  const candidatePending = candidates
    ?.map((candidate) => (candidate.applied_status === 'Pending' ? candidate : undefined))
    .filter((e) => e);

  const candidateRejected = candidates
    ?.map((candidate) => {
      if (candidate.applied_status === 'Reject') {
        return candidate;
      }
      return undefined;
    })
    .filter((e) => e);
  const candidateApproved = candidates
    ?.map((candidate) => (candidate.applied_status === 'Approve' ? candidate : undefined))
    .filter((e) => e);

  const [page, setPage] = useState(0);
  const [pageApproved, setPageApproved] = useState(0);
  const [pageRejected, setPageRejected] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [selectedApproved, setSelectedApproved] = useState([]);
  const [selectedRejected, setSelectedRejected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [filterNameApproved, setFilterNameApproved] = useState('');
  const [filterNameRejected, setFilterNameRejected] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.member_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleSelectAllClickApproved = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.member_name);
      setSelectedApproved(newSelecteds);
      return;
    }
    setSelectedApproved([]);
  };
  const handleSelectAllClickRejected = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.member_name);
      setSelectedRejected(newSelecteds);
      return;
    }
    setSelectedRejected([]);
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
  const handleClickApproved = (event, name) => {
    const selectedIndex = selectedApproved.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedApproved, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedApproved.slice(1));
    } else if (selectedIndex === selectedApproved.length - 1) {
      newSelected = newSelected.concat(selectedApproved.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedApproved.slice(0, selectedIndex),
        selectedApproved.slice(selectedIndex + 1)
      );
    }
    setSelectedApproved(newSelected);
  };
  const handleClickRejected = (event, name) => {
    const selectedIndex = selectedRejected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRejected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRejected.slice(1));
    } else if (selectedIndex === selectedRejected.length - 1) {
      newSelected = newSelected.concat(selectedRejected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRejected.slice(0, selectedIndex),
        selectedRejected.slice(selectedIndex + 1)
      );
    }
    setSelectedRejected(newSelected);
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
  const handleFilterByNameApproved = (event) => {
    setFilterNameApproved(event.target.value);
  };
  const handleFilterByNameRejected = (event) => {
    setFilterNameRejected(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - candidates.length) : 0;

  const filteredUsers = applySortFilter(candidatePending, getComparator(order, orderBy), filterName);
  const filteredUsersApproved = applySortFilter(candidateApproved, getComparator(order, orderBy), filterName);
  const filteredUsersRejected = applySortFilter(candidateRejected, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers?.length === 0;

  const handleRejectResume = (id) => {
    const status = 'Reject';
    const staffID = staff.id;
    dispatch(changeCandidateStatus({ status, id, staffID }));

    // window.location.reload(false);
  };
  const hanldeApproveResume = (id, member_id) => {
    const staffID = staff.id;
    // const member_id =
    const status = 'Approve';
    dispatch(changeCandidateStatus({ status, id, member_id, staffID }));
    // dispatch(getCandidateByStaff({ staffID }));

    // window.location.reload(false);
  };
  // useEffect(() => {
  //   const staffID = staff.id;

  //   dispatch(getCandidateByStaff({ staffID }));
  // }, [dispatch, staff.id]);
  useEffect(() => {
    const staffID = staff.id;
    console.log('dispatch re-render');
    dispatch(getCandidateByStaff({ staffID }));
  }, [notification]);
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Candidate Requested
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
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
                  rowCount={candidatePending?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, member_name, job_name, applied_status, member_avatar, resume_url, member_id } =
                      row || {};
                    const isItemSelected = selected.indexOf(member_name) !== -1;

                    return (
                      row && (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, member_name)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={member_avatar}
                                src={
                                  member_avatar !== '#'
                                    ? member_avatar
                                    : `/static/mock-images/avatars/avatar_${(faker.datatype.number() + 1) % 24}.jpg`
                                }
                              />
                              <Typography variant="subtitle2" noWrap>
                                {member_name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            {' '}
                            <Typography fontWeight="500">{job_name}</Typography>{' '}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={
                                resume_url !== '#'
                                  ? resume_url
                                  : `https://drive.google.com/file/d/1CokKuukOFgsanKxkTbpKAzYZOplZni28/view?usp=sharing`
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Iconify icon={'akar-icons:paper'} width={22} height={22} />
                            </a>
                          </TableCell>
                          <TableCell align="center">{applied_status}</TableCell>
                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                          {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'Inactive' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}
                          <TableCell>
                            <Stack direction="row" justifyContent="center">
                              <Button color="error" onClick={() => handleRejectResume(id)}>
                                Reject
                              </Button>
                              <Button color="success" onClick={() => hanldeApproveResume(id, member_id)}>
                                Approve
                              </Button>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
                        </TableRow>
                      )
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
            count={candidatePending?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <br />
        <Typography variant="h4" mb={5} gutterBottom sx={{ color: 'green' }}>
          Approved
        </Typography>
        <Card>
          <UserListToolbar
            numSelected={selectedApproved.length}
            filterName={filterNameApproved}
            onFilterName={handleFilterByNameApproved}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_STATUS}
                  rowCount={candidateApproved?.length}
                  numSelected={selectedApproved?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClickApproved}
                />
                <TableBody>
                  {filteredUsersApproved?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, member_name, job_name, applied_status, member_avatar, resume_url } = row || {};
                    const isItemSelected = selectedApproved.indexOf(member_name) !== -1;
                    return (
                      row && (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClickApproved(event, member_name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={member_avatar}
                                src={
                                  member_avatar !== '#'
                                    ? member_avatar
                                    : `/static/mock-images/avatars/avatar_${(faker.datatype.number() + 1) % 24}.jpg`
                                }
                              />
                              <Typography variant="subtitle2" noWrap>
                                {member_name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{job_name}</TableCell>

                          <TableCell align="center">
                            <Button>
                              <a
                                href={
                                  resume_url !== '#'
                                    ? resume_url
                                    : `https://drive.google.com/file/d/1CokKuukOFgsanKxkTbpKAzYZOplZni28/view?usp=sharing`
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Iconify icon={'akar-icons:paper'} width={22} height={22} />
                              </a>
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Label variant="ghost" color={(applied_status === 'Approve' && 'success') || 'error'}>
                              {applied_status}
                            </Label>
                          </TableCell>
                        </TableRow>
                      )
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
                        <SearchNotFound searchQuery={filterNameApproved} />
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
            count={candidateApproved?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <br />
        <Typography variant="h4" mb={5} gutterBottom color="danger" sx={{ color: 'red' }}>
          Rejected
        </Typography>
        <Card>
          <UserListToolbar
            numSelected={selectedRejected.length}
            filterName={filterNameRejected}
            onFilterName={handleFilterByNameRejected}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_STATUS}
                  rowCount={candidateRejected?.length}
                  numSelected={selectedRejected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClickRejected}
                />
                <TableBody>
                  {filteredUsersRejected?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, member_name, job_name, applied_status, member_avatar, resume_url } = row;
                    const isItemSelected = selectedRejected.indexOf(member_name) !== -1;

                    return (
                      row && (
                        <TableRow
                          hover
                          key={id ? id : '#'}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClickRejected(event, member_name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={member_avatar}
                                src={
                                  member_avatar !== '#'
                                    ? member_avatar
                                    : `/static/mock-images/avatars/avatar_${(faker.datatype.number() + 1) % 24}.jpg`
                                }
                              />
                              <Typography variant="subtitle2" noWrap>
                                {member_name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{job_name}</TableCell>

                          <TableCell align="center">
                            <Button>
                              <a
                                href={
                                  resume_url !== '#'
                                    ? resume_url
                                    : `https://drive.google.com/file/d/1CokKuukOFgsanKxkTbpKAzYZOplZni28/view?usp=sharing`
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Iconify icon={'akar-icons:paper'} width={22} height={22} />
                              </a>
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Label variant="ghost" color={(applied_status === 'Reject' && 'error') || 'success'}>
                              {applied_status}
                            </Label>
                          </TableCell>
                        </TableRow>
                      )
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
                        <SearchNotFound searchQuery={filterNameRejected} />
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
            count={candidateRejected?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
