import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, IconButton, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { CreateButton } from 'src/components/button/CreateButton';

export const BillsCreate = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [products, setProducts] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [guitars, setGuitars] = React.useState([
    {model: "123", price: 12},
    {model: "2321", price: 23}
  ])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = (newValue) => {
    if(newValue == null) return 
    newValue.amount = 1
    if(products.findIndex((item) => item.model === newValue.model) === -1) {
      setProducts([...products,newValue]);
    }
  }

  const handleChangeAmount = (value, index) => {
    const newProducts = products.map((item, index1) => {
      if(index === index1) {
        if(value)
          item.amount = parseInt(value)
        else
          item.amount = 0
      }
      return item
    })
    setProducts(newProducts)
  };

  const handleCreateBill = () => {
    const sum = products.reduce((partialSum, item) => partialSum+item.price*item.amount,0 )
    setTotal(sum)
    setProducts(products.filter(item => item.amount !== 0))
  };

  const createBill = () => {
    const createBillAPI = async () => {
      const response = await fetch(
        "http://localhost:3001/products/all"
      ).then((response) => response.json());

      if(response) {
        // loadBill
      }
    };
    // createBillAPI()
  };

  React.useEffect(() => {
    if (open) {
      const getGuitarDataAPI = async () => {
        const response = await fetch(
          "http://localhost:3001/products/all"
        ).then((response) => response.json());
      
        setGuitars(response);
      };
      // getGuitarDataAPI()
    }
  }, [open]);

  return (
    <div>
        <Button  
        onClick={handleClickOpen('paper')}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                    ADD
                </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen
      >
            
        <DialogTitle>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <div>New Bill</div>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell colSpan={5}>
                            <Autocomplete
                            disablePortal
                            options={guitars}
                            getOptionLabel={(option) => option.model}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Guitar" />}
                            onChange={(event, newValue) => handleAddProduct(newValue)}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product,index1) => 
                        <TableRow key={index1} >
                            <TableCell>
                                {/* {product.image} */}
                            </TableCell>
                            <TableCell>
                                {product.model}
                            </TableCell>
                            <TableCell>
                            <TextField
                              label="Amount"
                              type="number"
                              size='small'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={product.amount}
                              onChange={(event) => handleChangeAmount(event.target.value, index1)}
                            />
                            </TableCell>
                            <TableCell>
                                {product.price}
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton
                                edge="start"
                                aria-label="close"
                                color="error"
                                onClick={() => setProducts(products.filter((item,index) => index !== index1))}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>    
                    )}
                </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <CreateButton handleOpen={handleCreateBill} content={`Total bill: ${total} $`} title="CREATE NEW BILL" handleAgree={createBill}>Create</CreateButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

