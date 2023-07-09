import { useCallback, useMemo, useState } from 'react';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { BillsTable } from 'src/sections/bill/bills-table';
import { BillsSearch } from 'src/sections/bill/bills-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { BillsCreate } from 'src/sections/bill/bills-create';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed25',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    price: 123.5,
    name: 'Carson Darrin',
    phone: '304-428-3097',
    payment: "Cash",
    items: [{
        name: "Guitar Acoustic GA-14HL",
        amount: 2,
        price: 50
    },{
        name: "Guitar Classic GC-14HV",
        amount: 2,
        price: 40
    },{
        name: "Guitar Acoustic GA-18HL",
        amount: 2,
        price: 33.5
    }]
  },
  {
    id: '5e887b209c28ac',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    price: '66.4',
    name: 'Fran Perez',
    phone: '712-351-5711',
    payment: "Credit",
    items: [{
        name: "Guitar Acoustic GA-14HL",
        amount: 2,
        price: 50
    },{
        name: "Guitar Classic GC-14HV",
        amount: 2,
        price: 40
    },{
        name: "Guitar Acoustic GA-18HL",
        amount: 2,
        price: 32
    }]
  },
  {
    id: '5e887b7602bdbc',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    price: '76',
    name: 'Jie Yan Song',
    phone: '770-635-2682',
    payment: "Cash",
    items: [{
        name: "Guitar Acoustic GA-14HL",
        amount: 2,
        price: 50
    },{
        name: "Guitar Classic GC-14HV",
        amount: 2,
        price: 40
    },{
        name: "Guitar Acoustic GA-18HL",
        amount: 2,
        price: 32
    }]
  },
];

const useBills = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useBillIds = (bills) => {
  return useMemo(
    () => {
      return bills.map((bill) => bill.id);
    },
    [bills]
  );
};

export const Sale = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const bills = useBills(page, rowsPerPage);
  const billsIds = useBillIds(bills);
  const billsSelection = useSelection(billsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

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
                <BillsCreate />
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