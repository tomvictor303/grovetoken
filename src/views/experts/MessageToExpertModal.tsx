// Next Imports
import { useRouter } from 'next/router'

// Mui Imports
import { Avatar, Box, Button, Card, CardContent, IconButton, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import CloseIcon from 'mdi-material-ui/Close'
import StarIcon from 'mdi-material-ui/Star'
import { useEffect, useState } from 'react';
import { getCountryObject, getExpertiseObject } from 'src/utils/constants';
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useWeb3 } from 'src/utils/context/Web3/web3Context';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

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

export interface MessageToExpertModalProps {
  open: boolean;
  expert: any;
  onClose: () => void;
}
const MessageToExpertModal = ({open, expert, onClose}: MessageToExpertModalProps) => {
  const dispatch = useAppDispatch();
  // **State
  const [ message, setMessage ] = useState<string>("");
  
  // Hook  
  const router = useRouter()

  // Web3
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { web3_get_allowance } = useWeb3();

  useEffect(() => {
    const my_async_func = async () => {
      if ( !address || !isConnected ) {
        return;
      }
      const allowance: number = await web3_get_allowance();
      console.log(`web3_get_allowance`, allowance)
    }
    my_async_func();
  }, [ address, isConnected ])

  if (!expert) { return <></>};

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
        expert_id: expert.id,
        content: message,
      }),
    };

    dispatch(showBackdrop({ 
      message: `Sending message, Please wait...` 
    }))

    fetch(API_URL + '/questions', options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        dispatch(showSnackBar({ type: 'success', message: `Your message is successfully delivered.` }));
        setMessage('');
        onClose();
        router.push('/dashboard/client')
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
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Card>
          <Box sx={cardHeaderStyle}>
            <h2 id="modal-title">Send message to expert</h2>
            <IconButton onClick={onClose}>
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
                  <Stack direction='row' alignItems={'center'} spacing={1}>
                    <StarIcon color='primary'/>
                    <Typography>{expert.expert_rating} /10 ({expert.expert_rating_count} jobs)</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box mt={2}>
              <Typography>Message:</Typography>
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
            </Box>
            <Box mt={2} textAlign={'center'}>
              <Button variant="contained" onClick={sendMessage}>Send</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  </>
}

export default MessageToExpertModal;