import { CustomCard, CustomCardContent, CustomCardHeader, CustomFormControl } from 'src/views/custom/CustomCard';
import { 
  MonitorShimmer as MonitorShimmerIcon,
  TruckOutline as TruckOutlineIcon,
  Tune as TuneIcon,
  Lan as LanIcon,
  FountainPenTip as FountainPenTipIcon,
  WindowShutterSettings as WindowShutterSettingsIcon,
  InformationOutline as InformationOutlineIcon,
  PlusCircleOutline as PlusCircleOutlineIcon,
} from 'mdi-material-ui'
import { Box, Button, FormHelperText, Grid, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import IOSSwitch from '../custom/IOSSwitch';
import { styled, useTheme } from '@mui/material/styles';

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OptionsCard = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>    
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <TuneIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Options</Typography>
        </CustomCardHeader>
        
        {/** BEGIN Options_card_switch_part */}
        <Box>
          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isConformedERC20} onChange={handleCheckedChange('isConformedERC20')}
              />
              <Typography className={'control-switch-title'}>Conforms to ERC20 protocol</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Your token will const all the functionalities, and conforms to ERC20 protocol</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isVerifiedOnEtherscan} onChange={handleCheckedChange('isVerifiedOnEtherscan')}
              />
              <Typography className={'control-switch-title'}>Verified on Etherscan</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Your token will const all the functionalities, and conforms to ERC20 protocol</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isNoCopyrightLink} onChange={handleCheckedChange('isNoCopyrightLink')}
              />
              <Typography className={'control-switch-title'}>No copyright link</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>A link pointing to this page will be added in the description of your contract (Free and Basic contracts only)</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isMintable} onChange={handleCheckedChange('isMintable')}
              />
              <Typography className={'control-switch-title'}>Mintable</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Allow the creation of new tokens in the future</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isBurnable} onChange={handleCheckedChange('isBurnable')}
              />
              <Typography className={'control-switch-title'}>Burnable</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Allow your tokens to be burned</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isPausable} onChange={handleCheckedChange('isPausable')}
              />
              <Typography className={'control-switch-title'}>Pausable</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Allow your tokens to be paused</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isRecoverable} onChange={handleCheckedChange('isRecoverable')}
              />
              <Typography className={'control-switch-title'}>Recoverable</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Allow to recover any ERC20 tokens sent to your contract</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isAntiWhale} onChange={handleCheckedChange('isAntiWhale')}
              />
              <Typography className={'control-switch-title'}>Anti Whale</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Add a tax on transactions.</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
              <IOSSwitch 
                checked={values.isTax} onChange={handleCheckedChange('isTax')}
              />
              <Typography className={'control-switch-title'}>Tax</Typography>
            </Stack>
            <FormHelperText className={'control-help'}>Add a tax on transactions.</FormHelperText>
          </CustomFormControl>
        </Box>              
        {/** END Options_card_switch_part */}

        {/** BEGIN Options_card_tax_part */}
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CustomFormControl fullWidth>
                <Typography className={'control-title'} variant='caption'>
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Box>BURN</Box>
                    <Tooltip title="Reduces total supply in real time as people transact the token, increasing rarity" className='cursorPoint'>
                      <InformationOutlineIcon className='extra-small-icon' color='success' />
                    </Tooltip>
                  </Stack>
                </Typography>
                <OutlinedInput 
                  className={'control-element'}
                  value={values.burnPercent}
                  onChange={handleChange('burnPercent')}
                  placeholder=""
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 100,
                    pattern: "\\d*",
                  }}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </CustomFormControl>
            </Grid>
            <Grid item xs={6}>                    
              <CustomFormControl fullWidth>                      
                <Typography className={'control-title'} variant='caption'>
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Box>Marketing</Box>
                    <Tooltip title="Route a percentage of taxes to your team wallets as people transact the token" className='cursorPoint'>
                      <InformationOutlineIcon className='extra-small-icon' color='success' />
                    </Tooltip>
                  </Stack>
                </Typography>
                <OutlinedInput 
                  className={'control-element'}
                  value={values.teamPercent}
                  onChange={handleChange('teamPercent')}
                  placeholder=""
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 100,
                    pattern: "\\d*",
                  }}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </CustomFormControl>
            </Grid>
          </Grid>

          <CustomFormControl fullWidth>
            <Typography variant='caption' align='center' color={theme.palette.customColors.semiwhite}>Breakdown of Taxes</Typography>
          </CustomFormControl>

          {/** BEGIN TEAM_ADDRESS_block_in_Options_card_tax_part*/}       
          <Box marginBottom={4}>
            <Typography className={'control-title'} variant='caption'>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Box>TEAM ADDRESS</Box>
                <Tooltip title="Specify which addresses should receive a percentage of the Team Tax Alloction" className='cursorPoint'>
                  <InformationOutlineIcon className='extra-small-icon' color='success' />
                </Tooltip>
              </Stack>
            </Typography>
            
            {/** address list*/}
            <Box>
            </Box>

            {/** Add new button */}
            <Box>
              <Button variant='text' color='success'>
                <PlusCircleOutlineIcon/>&nbsp;&nbsp;
                <Typography variant='body2' style={{ display: 'inline', color: theme.palette.success.main, textDecoration: 'underline'}}>Add a new address</Typography>
              </Button>
            </Box>
          </Box>
          {/** END TEAM_ADDRESS_block_in_Options_card_tax_part */}

          <CustomFormControl fullWidth>
            <Select 
              className={'control-element'}
              value={values.taxCurrency}
              onChange={handleSelectChange('taxCurrency')}
              displayEmpty           
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={'eth'}>Send tax in ETH</MenuItem>
              <MenuItem value={'token'}>Send tax in Token</MenuItem>
            </Select>
            <FormHelperText className={'control-help'}>
              Select the currency to send to the team (ETH or tokens). The tax will be swapped if ETH is selected.
            </FormHelperText>
          </CustomFormControl>
        </Box>
        {/** END Options_card_tax_part */}

        {/** BEGIN Options_card_final_part */}
        <Box>
          <CustomFormControl fullWidth>
            <Typography className={'control-title'} variant='caption'>ROUTER</Typography>
            <Select 
              className={'control-element'}
              value={values.swap_router}
              onChange={handleSelectChange('swap_router')}
              displayEmpty           
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={'uniswap_router_v2'}>Uniswap Router V2</MenuItem>
              <MenuItem value={'pancakeswap_router_v2'}>Pancakeswap Router V2</MenuItem>
            </Select>
            <FormHelperText className={'control-help'}>Select the swap router to use</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Typography className={'control-title'} variant='caption'>ACCESS TYPE*</Typography>
            <Select 
              className={'control-element'}
              value={values.access_type}
              onChange={handleSelectChange('access_type')}
              displayEmpty           
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={'Owner'}>Owner</MenuItem>
              <MenuItem value={'Admin'}>Admin</MenuItem>
            </Select>
            <FormHelperText className={'control-help'}>Who can administer your contract</FormHelperText>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Typography variant='caption'>
              <span style={{color: theme.palette.success.main}}>Owner:</span> Your wallet address will be set as the owner of your token to perform administrative tasks (ie, mint new tokens).
            </Typography>
          </CustomFormControl>

          <CustomFormControl fullWidth>
            <Typography variant='caption'>
              <span style={{color: theme.palette.success.main}}>Roles:</span> All admin tasks (mint, burn, etc...) will be available to different users, based on their roles. By default, your wallet's address will be given all the roles.
            </Typography>
          </CustomFormControl>
        </Box>
        {/** END Options_card_final_part */}
      </CustomCardContent>
    </CustomCard>
  </>
}

export default OptionsCard;