import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  FormControl,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const BillsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Bill ID</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Items</TableCell>
                {/* <TableCell>Phone</TableCell> */}
                <TableCell>Staff</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((bill) => {
                const isSelected = selected.includes(bill._id);
                const createdAt = bill.timestamp ? format(new Date(bill.timestamp), 'dd/MM/yyyy') : '-';

                return (
                  <TableRow hover key={bill._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(bill._id);
                          } else {
                            onDeselectOne?.(bill._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar src={bill.avatar}>
                          {getInitials(bill.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">{bill._id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{bill.price} $</TableCell>
                    <TableCell>
                      <FormControl sx={{ width: 60 }}>
                        <Select>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Price</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {bill?.products?.map((item, index) => (
                                <TableRow hover key={index}>
                                  <TableCell>{item.productId.model}</TableCell>
                                  <TableCell align="center">{item.quantity}</TableCell>
                                  <TableCell>{item.productId.price * item.quantity} $</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Select>
                      </FormControl>
                    </TableCell>
                    {/* <TableCell>{bill.phone}</TableCell> */}
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={bill?.avatar}>{getInitials(bill.employeeId.firstName)}</Avatar>
                        <Typography variant="subtitle2">{bill.employeeId.firstName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BillsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
