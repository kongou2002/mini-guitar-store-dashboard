import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { success } from 'src/store/slice/notificationSlice';



export default function DatReportDialog({ id, is_employee, fullname, reloadData }) {
    const [open, setOpen] = React.useState(false);
    const [idDecide, setIdDecide] = React.useState('')
    const dispatch = useDispatch()


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenDecide = (id) => {
        setOpen(true)
        setIdDecide(id)

    }
    const handleApprove = (id, data) => {
        // console.log(data)
        const approved = async () => {
            console.log(id)
            const url = "http://localhost:8000/api/candidate/profile";
            const { decideData } = await axios.patch(url, {
                reportId: id,
                result: data
            })

        }
        dispatch(success("Updated successfully"))
        reloadData();
        setOpen(false);
        approved();
    }

    // const handleReject = (id, data) => {
    //     console.log(data)
    //     const rejected = async () => {
    //         //
    //         try {

    //             const url = "http://localhost:8000/api/candidate/profile";
    //             const { decideData } = await axios.patch(url, {
    //                 candidateId: id,
    //                 result: data
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     setOpen(false)
    //     rejected()
    // }

    console.log(id)
    return (
        <div>

            {is_employee === 'Not yet' && (

                <Button variant="contained"
                    onClick={() => handleOpenDecide(id)}
                >
                    Give result
                </Button>)}

            {is_employee === 'Approve' && (

                <Button variant="contained"
                    disabled
                >
                    Approved
                </Button>)}
            {is_employee === 'Reject' && (

                <Button variant="contained"
                    disabled
                >
                    Rejected
                </Button>)}


            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} sx={{
                width: '100%',
                height: '100%',
            }}>
                <DialogTitle>DECISION</DialogTitle>
                <DialogContent>
                    Do you want to approve
                    {` ${fullname} to be a part of your company?`}
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        backgroundColor: "red", color: "white",
                        "&:hover": {
                            color: 'red',
                        },
                    }}
                        onClick={() => handleApprove(idDecide, "reject")}
                    >Reject</Button>


                    <Button sx={{
                        backgroundColor: "green", color: "white",
                        "&:hover": {
                            color: 'green',
                        },
                    }}
                        onClick={() => handleApprove(idDecide, "approve")}
                    >Approve</Button>

                </DialogActions>
            </Dialog>
        </div>

    )
}
