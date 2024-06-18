// Next Imports
import { useRouter } from 'next/router'

// Mui Imports
import { Avatar, Box, Button, Card, CardContent, IconButton, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from 'mdi-material-ui/Close'
import StarIcon from 'mdi-material-ui/Star'
import { useState } from 'react';
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

export interface SendAnswerModalProps {
  open: boolean;
  client: any;
  question: any;
  solution: any;
  onClose: () => void;
  onSuccess: () => void;
}
const SendAnswerModal = ({open, client, question, solution, onClose, onSuccess}: SendAnswerModalProps) => {
  const dispatch = useAppDispatch();
  // **State
  const [ message, setMessage ] = useState<string>("");

  const handleClose = () => {
    setMessage("")
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
    onSuccess();
  };

  // Hook  
  const router = useRouter()

  if (!client || !question) { return <></>};

  const sendMessage = () => {
    if (!message) {      
      dispatch(showSnackBar({ type: 'error', message: `Please input your message first.` })); 
      return;
    }

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: question.id,
        content: message,
      }),
    };

    dispatch(showBackdrop({ 
      message: `Sending message, Please wait...` 
    }))

    fetch(API_URL + '/solutions', options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        dispatch(showSnackBar({ type: 'success', message: `Your answer is successfully delivered.` }));
        setMessage('');
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
                  alt={`${client.first_name} ${client.last_name}`}
                  src={client.avatar ?? '/images/avatars/1.png'}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <Typography variant='h6'>{`${client.first_name} ${client.last_name}`}</Typography>
                  <Stack direction='row' alignItems={'center'} spacing={2}>
                    <Box>
                      <Tooltip title={getCountryObject(client.country)?.label ?? 'Unknown'}>
                        <img
                            className={'cursorPoint'}
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${client.country?.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${client.country?.toLowerCase()}.png`}
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
                <TextField
                  id="standard-textarea" 
                  placeholder=""
                  multiline
                  minRows={8}
                  fullWidth
                  value={message}
                  onChange={(event: any) => {
                    setMessage(event.target.value);
                  }}
                />
              )}
            </Box>
            {!solution && (
              <Box mt={2} textAlign={'center'}>
                <Button variant="contained" onClick={sendMessage}>Send</Button>
              </Box>
            )}
            { (solution?.rating > 0) && (
              <Box mt={4}>
                <Typography><b>Rate from client:</b></Typography>
                <Stack direction='row' alignItems={'center'} spacing={1}>
                  <StarIcon color='primary'/>
                  <Typography>{solution.rating} /10</Typography>
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  </>
}

export default SendAnswerModal;