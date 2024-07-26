import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import {
  Close as CloseIcon,
} from 'mdi-material-ui'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog: any = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface TermsOfServiceDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsOfServiceDialog({ open, onClose }: TermsOfServiceDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ px: 6 }} id="customized-dialog-title">
          Important Notice
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ margin: '0 2' }}>
          <Box px={4}>
            <Typography gutterBottom>
              The Token Generator is a tool provided by GroveToken Limited to facilitate the creation of
              token smart contracts. By using this tool, you acknowledge and agree to the following:
            </Typography>
          </Box>
          <ul style={{ listStyleType: 'decimal' }}>
            <li>
              <Typography gutterBottom>
                <b>No Liability for Created Contracts</b>: GroveToken Limited, its affiliates, and its partners
                do not assume any responsibility or liability for the token smart contracts created using
                the Token Generator. All tokens and contracts created are the sole responsibility of the
                user who created them.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>User Responsibility</b>: Users are fully responsible for ensuring the security, functionality,
                and compliance of their token contracts with applicable laws and regulations. It is the
                user’s duty to conduct thorough testing and auditing of their contracts before deploying
                them.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>No Endorsement</b>: The availability of the Token Generator does not constitute an
                endorsement or recommendation of any token contract created using this tool.
                GroveToken Limited does not verify or validate the projects or tokens created.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>Compliance and Legal Requirements</b>: Users must ensure that their use of the Token
                Generator and the token contracts created comply with all relevant local, national, and
                international laws and regulations, including but not limited to securities laws and anti-money laundering regulations.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>Risk Acknowledgment</b>: The creation and deployment of token contracts involve
                significant risks, including but not limited to technical failures, security vulnerabilities,
                and regulatory actions. Users should be aware of these risks and seek appropriate advice
                and expertise before proceeding.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>No Guarantees</b>: GroveToken Limited makes no guarantees, representations, or
                warranties regarding the performance, security, or functionality of the token contracts
                created using the Token Generator. The tool is provided on an "as-is" basis.
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
                <b>Indemnification</b>: By using the Token Generator, users agree to indemnify, defend, and
                hold harmless GroveToken Limited, its affiliates, and its partners from any and all
                claims, liabilities, damages, losses, or expenses arising from or related to the creation,
                deployment, or use of token contracts.
              </Typography>
            </li>
          </ul>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
