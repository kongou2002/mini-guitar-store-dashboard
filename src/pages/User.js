import { filter, first, get, set } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import axios from 'axios';
import { getAllMember } from '../store/slice/memberSlice';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Email', alignRight: false },
  { id: 'role', label: 'Phone', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'cv', label: 'Resume', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: "sheet", label: "Sheet", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator( a, b, orderBy ) {
  if ( b[ orderBy ] < a[ orderBy ] ) {
    return -1;
  }
  if ( b[ orderBy ] > a[ orderBy ] ) {
    return 1;
  }
  return 0;
}

function getComparator( order, orderBy ) {
  return order === 'desc'
    ? ( a, b ) => descendingComparator( a, b, orderBy )
    : ( a, b ) => -descendingComparator( a, b, orderBy );
}

function applySortFilter( array, comparator, query ) {
  const stabilizedThis = array?.map( ( el, index ) => [ el, index ] );
  stabilizedThis?.sort( ( a, b ) => {
    const order = comparator( a[ 0 ], b[ 0 ] );
    if ( order !== 0 ) return order;
    return a[ 1 ] - b[ 1 ];
  } );
  if ( query ) {
    return filter( array, ( _user ) => _user.fullname.toLowerCase().indexOf( query.toLowerCase() ) !== -1 );
  }
  return stabilizedThis?.map( ( el ) => el[ 0 ] );
}

export default function User() {
  const { members } = useSelector( ( state ) => state.members );
  const dispatch = useDispatch();
  const [ page, setPage ] = useState( 0 );

  const [ order, setOrder ] = useState( 'asc' );

  const [ selected, setSelected ] = useState( [] );

  const [ orderBy, setOrderBy ] = useState( 'name' );

  const [ filterName, setFilterName ] = useState( '' );

  const [ rowsPerPage, setRowsPerPage ] = useState( 5 );

  const [ loading, setLoading ] = useState( false );

  useEffect( () => {
    const members = async () => {
      dispatch( getAllMember() );
    }
    members();
  }, [ loading ] );

  const handleLoading = () => {
    setLoading( !loading );
  }

  const handleRequestSort = ( event, property ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder( isAsc ? 'desc' : 'asc' );
    setOrderBy( property );
  };

  const handleSelectAllClick = ( event ) => {
    if ( event.target.checked ) {
      const newSelecteds = members.map( ( n ) => n.email );
      setSelected( newSelecteds );
      return;
    }
    setSelected( [] );
  };

  const handleClick = ( event, name ) => {
    const selectedIndex = selected.indexOf( name );
    let newSelected = [];
    if ( selectedIndex === -1 ) {
      newSelected = newSelected.concat( selected, name );
    } else if ( selectedIndex === 0 ) {
      newSelected = newSelected.concat( selected.slice( 1 ) );
    } else if ( selectedIndex === selected.length - 1 ) {
      newSelected = newSelected.concat( selected.slice( 0, -1 ) );
    } else if ( selectedIndex > 0 ) {
      newSelected = newSelected.concat( selected.slice( 0, selectedIndex ), selected.slice( selectedIndex + 1 ) );
    }
    setSelected( newSelected );
  };

  const handleChangePage = ( event, newPage ) => {
    setPage( newPage );
  };

  const handleChangeRowsPerPage = ( event ) => {
    setRowsPerPage( parseInt( event.target.value, 10 ) );
    setPage( 0 );
  };

  const handleFilterByName = ( event ) => {
    setFilterName( event.target.value );
  };

  const emptyRows = page > 0 ? Math.max( 0, ( 1 + page ) * rowsPerPage - members.length ) : 0;

  const filteredUsers = applySortFilter( members, getComparator( order, orderBy ), filterName );

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={ 5 }>
          <Typography variant="h4" gutterBottom>
            User list
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={ selected.length } filterName={ filterName } onFilterName={ handleFilterByName } />

          <Scrollbar>
            <TableContainer sx={ { minWidth: 800 } }>
              <Table>
                <UserListHead
                  order={ order }
                  orderBy={ orderBy }
                  headLabel={ TABLE_HEAD }
                  rowCount={ members?.length }
                  numSelected={ selected.length }
                  onRequestSort={ handleRequestSort }
                  onSelectAllClick={ handleSelectAllClick }
                />
                <TableBody>
                  { filteredUsers?.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage ).map( ( row ) => {
                    const { _id, email, lastName, firstName, phone, active, role, sheets } = row;
                    const isItemSelected = selected.indexOf( email ) !== -1;
                    return (
                      <TableRow
                        hover
                        key={ _id }
                        tabIndex={ -1 }
                        role="checkbox"
                        selected={ isItemSelected }
                        aria-checked={ isItemSelected }
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={ isItemSelected } onChange={ ( event ) => handleClick( event, email ) } />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={ 2 }>
                            {/* <Avatar src={avatar} /> */ }
                            <Typography variant="subtitle2" noWrap>
                              { lastName + ' ' + firstName }
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{ email }</TableCell>
                        <TableCell align="center">{ phone }</TableCell>
                        <TableCell align="center">{ role }</TableCell>

                        <TableCell align="center">{ active }</TableCell>
                        <TableCell align="center">{ sheets.length }</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu id={ _id } onLoading={ handleLoading } />
                        </TableCell>
                      </TableRow>
                    );
                  } ) }
                  { emptyRows > 0 && (
                    <TableRow style={ { height: 53 * emptyRows } }>
                      <TableCell colSpan={ 6 } />
                    </TableRow>
                  ) }
                </TableBody>

                { isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={ 6 } sx={ { py: 3 } }>
                        <SearchNotFound searchQuery={ filterName } />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) }
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={ [ 5, 10, 25 ] }
            component="div"
            count={ members?.length }
            rowsPerPage={ rowsPerPage }
            page={ page }
            onPageChange={ handleChangePage }
            onRowsPerPageChange={ handleChangeRowsPerPage }
          />
        </Card>
      </Container>
    </Page>
  );
}
