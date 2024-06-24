import { styled, useTheme } from '@mui/material/styles';
import { Badge, Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, FormControl, FormHelperText, InputAdornment, Link, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material'

export const CustomCard = styled(Card)(({ theme }) => ({
  // borderRadius: theme.shape.borderRadius * 2,
}));

export const CustomCardContent = styled(CardContent)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

export const CustomCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(5),

  '& .cardheader-icon': {
    color: theme.palette.success.main,
  },
  '& .cardheader-title': {
    color: theme.palette.customColors.semiwhite,
  },
}));

export const CustomFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(7),
  '& .control-title': {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  '& .control-element': {
    marginBottom: theme.spacing(2),
  },
  '& .control-element .MuiOutlinedInput-input': {
    color: theme.palette.customColors.semiwhite, // style for inputed text
    paddingTop: '12px',
    paddingBottom: '12px',
    borderWidth: '5px',
  },
  '& .control-element .MuiAutocomplete-inputRoot': {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  '& .control-element .MuiAutocomplete-input': {
    paddingTop: '12px!important',
    paddingBottom: '12px!important',
  },
  '& .control-element fieldset': {
    borderWidth: '2px',
    borderColor: '#777E90'
  },
  '& .control-help': {
    margin: 0,
  },
  '& .control-switch-title': {
    color: theme.palette.customColors.semiwhite,
  }
})); 