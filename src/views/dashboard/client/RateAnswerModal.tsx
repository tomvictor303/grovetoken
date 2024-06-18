// Next Imports
import { useRouter } from 'next/router'

// Mui Imports
import { Avatar, Box, Button, Card, CardContent, Chip, IconButton, Modal, Rating, Stack, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from 'mdi-material-ui/Close'
import StarIcon from 'mdi-material-ui/Star'
import { useEffect, useState } from 'react';
import { getCountryObject, getExpertiseObject } from 'src/utils/constants';
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 16px',
  borderBottom: '1px solid #ccc',
};

const cardContentStyle = {
  padding: '16px',
};

export interface RateAnswerModalProps {
  open: boolean;
  expert: any;
  question: any;
  solution: any;
  onClose: () => void;
  onSuccess: () => void;
}
const RateAnswerModal = ({open, expert, question, solution, onClose, onSuccess}: RateAnswerModalProps) => {
  const dispatch = useAppDispatch();
  // **State
  const [ myRate, setMyRate ] = useState<number | null>(0);

  const handleClose = () => {
    setMyRate(0);
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
    onSuccess();
  };
  
  // Hook  
  const router = useRouter()

  if (!expert || !question) { return <></>};

  const sendMessage = () => {
    if (!myRate) {
      dispatch(showSnackBar({ type: 'error', message: `Please rate more than zero.` })); 
      return;
    }

    if (!solution?.id) {
      dispatch(showSnackBar({ type: 'error', message: `Answer to rate does not exist.` })); 
      return;
    }

    var options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: myRate,
      }),
    };

    dispatch(showBackdrop({ 
      message: `Sending message, Please wait...` 
    }))

    fetch(API_URL + '/solutions/' + solution?.id, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        dispatch(showSnackBar({ type: 'success', message: `Your answer is successfully delivered.` }));
        handleSuccess();
      } else { 
        dispatch(showSnackBar({ type: 'error', message: data.msg })); 
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
  }

  return <>
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Card>
          <Box sx={cardHeaderStyle}>
            <h2 id="modal-title">Answer to client question</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <CardContent sx={cardContentStyle}>
            <Box>
              <Stack direction='row' alignItems={'center'} spacing={4}>                
                <Avatar
                  alt={`${expert.first_name} ${expert.last_name}`}
                  src={expert.avatar ?? '/images/avatars/1.png'}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <Typography variant='h6'>{`${expert.first_name} ${expert.last_name}`}</Typography>
                  <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Typography>{getExpertiseObject( expert.expert_expertise )?.name ?? 'Unknown'}</Typography>
                    <Box>
                      <Tooltip title={getCountryObject(expert.country)?.label ?? 'Unknown'}>
                        <img
                            className={'cursorPoint'}
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${expert.country?.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${expert.country?.toLowerCase()}.png`}
                            alt=""
                          />
                      </Tooltip>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box mt={4}>
              <Typography><b>Question:</b></Typography>
              <Typography>{question?.content}</Typography>
            </Box>
            <Box mt={4}>
              <Typography><b>Answer:</b></Typography>
              {solution ? (
                <Typography>{solution.content}</Typography>
              ): (
                <><Chip variant='filled' color={'primary'} label={'Waiting'} /></>
              )}
            </Box>
            {/** BEGIN RATING_BLOCK */}
            {
              solution?.id && (<>
                { (solution?.rating > 0) ? (
                  <Box mt={4}>
                    <Typography><b>Rate given to this answer:</b></Typography>
                    <Stack direction='row' alignItems={'center'} spacing={1}>
                      <StarIcon color='primary'/>
                      <Typography>{solution.rating} /10</Typography>
                    </Stack>
                  </Box>
                )
                : (
                  <Box mt={4}>                
                    <Typography color={'error'}><b>Please rate this answer:</b></Typography>
                    <Typography>{myRate ?? 0} / 10</Typography>
                    <Rating name="customized-10" defaultValue={0} max={10} precision={0.5}
                      value={myRate}
                      onChange={(event, newValue) => {
                        setMyRate(newValue);
                      }}
                    />
                    <Box mt={6}>
                      <Button variant='contained' color='primary' onClick={sendMessage}>Apply rate</Button>
                    </Box>
                  </Box>
                )
                }
              </>)
            }            
            {/** END RATING_BLOCK */}
            
          </CardContent>
        </Card>
      </Box>
    </Modal>
  </>
}

export default RateAnswerModal;