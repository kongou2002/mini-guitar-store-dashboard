import { useCallback, useEffect, useMemo, useState } from 'react';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { BillsTable } from 'src/sections/bill/bills-table';
import { BillsSearch } from 'src/sections/bill/bills-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { BillsCreate } from 'src/sections/bill/bills-create';
import { useSelector } from 'react-redux';
import { set } from 'lodash';

const now = new Date();

// const useData = async(token) => {
//   let result;
//   return useMemo(
//     async() => {
//   const fetchData = async () => {
//     const response = await fetch('http://localhost:8000/api/sale',{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();
//     result = data
//   };
//   await fetchData()
//   //await fetchData();
//   .then(() => {
//     return result;
//   })
//     },[]
//   );
// };
const useBills = (page, rowsPerPage,data) => {
  return useMemo(
    () => {
      const bills = applyPagination(data, page, rowsPerPage);
      return bills;
    },[page,rowsPerPage,data]);
};



const useBillIds = (bills) => {
  return useMemo(
    () => {
      return bills.map((bill) => bill._id);
    },
    [bills]
  );
};

export const Sale = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const token = useSelector((state) => state.staff.token);
  // const data = useData(token);
  // console.log(data)
  const bills = useBills(page, rowsPerPage,data);
  const billsIds = useBillIds(bills);
  const billsSelection = useSelection(billsIds);
  const [rerender, setRerender] = useState(false);
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/sale',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setData(data)
    }
    fetchData()
  }, [rerender])
  console.log(data)
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  SALE
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <BillsCreate loadBill = {setRerender} />
              </div>
            </Stack>
            {/* <BillsSearch /> */}
            <BillsTable
              count={data.length}
              items={bills}
              onDeselectAll={billsSelection.handleDeselectAll}
              onDeselectOne={billsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={billsSelection.handleSelectAll}
              onSelectOne={billsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={billsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
  );
};