// ** MUI Imports
import Grid from "@mui/material/Grid";

import { styled, useTheme } from "@mui/material/styles";

// ** LandingPage Components Imports

// ** Demo Components Imports
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputAdornment,
  Link,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {
  MonitorShimmer as MonitorShimmerIcon,
  TruckOutline as TruckOutlineIcon,
  Tune as TuneIcon,
  Lan as LanIcon,
  FountainPenTip as FountainPenTipIcon,
  WindowShutterSettings as WindowShutterSettingsIcon,
  InformationOutline as InformationOutlineIcon,
  PlusCircleOutline as PlusCircleOutlineIcon
} from "mdi-material-ui";
import { BorderRadius } from "mdi-material-ui";
import { ChangeEvent, useEffect, useState } from "react";
import IOSSwitch from "src/views/custom/IOSSwitch";
import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
  CustomFormControl
} from "src/views/custom/CustomCard";
import InformationsCard from "src/views/landing/InformationsCard";
import SupplyCard from "src/views/landing/SupplyCard";
import OptionsCard from "src/views/landing/OptionsCard";
import AgreementCard from "src/views/landing/AgreementCard";
import TransactionCard from "src/views/landing/TransactionCard";
import NetworkCard from "src/views/landing/NetworkCard";
import { getNetworkObject } from "src/utils/networks";
import { TokenType } from "src/utils/enums";

const LandingPage = () => {
  const theme = useTheme();
  const block_spacing = 6;

  // ** States
  const [values, setValues] = useState<HomeState>({
    network: getNetworkObject("GRV"),
    token_type: 0,
    token_name: "",
    token_symbol: "",
    token_decimals: 18,
    //////////////////////
    supply_type: "Fixed",
    initial_supply: 0,
    maximum_supply: 10000000,
    //////////////////////
    isConformedERC20: false,
    isVerifiedOnEtherscan: false,
    isNoCopyrightLink: false,
    isMintable: false,
    isBurnable: false,
    isPausable: false,
    isRecoverable: false,
    isAntiWhale: false, 
    isTax: false,
    //////////////////////
    buyPercent: 0,
    sellPercent: 0,
    transferPercent: 0,
    //////////////////////
    burnPercent: 0,
    teamPercent: 0,
    taxCurrency: "token",
    //////////////////////
    teamAddressList: [],
    //////////////////////
    swap_router: 'uniswap_router_v2',
    access_type: 'Owner',
  })

  const handleChange = (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => {
    if (prop === 'initial_supply') {
      handleInitialSupplyChange(event.target.value);
      return;
    }
    if (prop === 'maximum_supply') {
      handleMaximumSupplyChange(event.target.value);
      return;
    }
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSelectChange = (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleCheckedChange = (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.checked })
  };
  const handleAutoCompleteChange = (prop: keyof HomeState) => (event: any, newValue: any) => {
    setValues({ ...values, [prop]: newValue })
  };

  // special change handlers
  const handleInitialSupplyChange = (newValue: string) => {
    const isValidIntegerString = /^\d*$/; // Allow numeric, empty string.
    if (!isValidIntegerString.test(newValue)) {
      return;
    }
    const new_initial_supply: number = parseInt(newValue, 10);
    /////////////////
    if ( values?.supply_type === 'Fixed' || values?.supply_type === 'Unlimited' ) {
      setValues({ ...values, initial_supply: new_initial_supply, maximum_supply: new_initial_supply })
    } else {
      if ( new_initial_supply > values?.maximum_supply ) {
        setValues({ ...values, initial_supply: new_initial_supply, maximum_supply: new_initial_supply })
      } else {
        setValues({ ...values, initial_supply: new_initial_supply })
      }
    }
  }

  const handleMaximumSupplyChange = (newValue: string) => {
    const isValidIntegerString = /^\d*$/; // Allow numeric, empty string.
    if (!isValidIntegerString.test(newValue)) {
      return;
    }
    const new_maximum_supply: number = parseInt(newValue, 10);
    /////////////////    
    if ( new_maximum_supply < values?.initial_supply ) {
      setValues({ ...values, initial_supply: new_maximum_supply, maximum_supply: new_maximum_supply })
    } else {
      setValues({ ...values, maximum_supply: new_maximum_supply })
    }
  }

  /////////////////////////////////////
  // BEGIN tax_related_handlers
  const handleTAChange =
    (prop: keyof TeamAddress, index: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let teamAddressList: Array<TeamAddress> = [...values.teamAddressList];
      if (index < 0 || index >= teamAddressList.length) {
        return;
      }
      teamAddressList[index] = {
        ...teamAddressList[index],
        [prop]: event.target.value
      };
      setValues({ ...values, teamAddressList });
    };

  const addNewTeamAddress = () => {
    let teamAddressList: Array<TeamAddress> = [...values.teamAddressList];
    teamAddressList.push({ address: "", percent: 0 });
    setValues({ ...values, teamAddressList });
  };

  const removeTeamAddress = (index: number) => {
    let teamAddressList: Array<TeamAddress> = [...values.teamAddressList];
    const indexToRemove = index; // Index of the element you want to remove

    if (indexToRemove > -1 && indexToRemove < teamAddressList.length) {
      teamAddressList.splice(indexToRemove, 1);
    }

    console.log(teamAddressList);

    setValues({ ...values, teamAddressList });
  };
  // END tax_related_handlers
  /////////////////////////////////////

  useEffect(() => {
    // Forceful setting values for low level token_types
    if (values?.token_type === TokenType.Basic) {
      let initial_supply = 1000000;
      setValues({
        ...values,
        token_decimals: 18,
        supply_type: "Fixed",
        initial_supply,
        maximum_supply: initial_supply,
        access_type: 'Owner',
        isTax: false, // Basic is not able to use Tax
        //////////////////////
        buyPercent: 0,
        sellPercent: 0,
        transferPercent: 0,
        //////////////////////
        burnPercent: 0,
        teamPercent: 0,
        taxCurrency: "token",
        //////////////////////
        teamAddressList: [],
      });
    }
    /////////////////////////////////////////////
    /////////////////////////////////////////////
    /////////////////////////////////////////////
    if (values?.token_type === TokenType.Custom) {
      let initial_supply = 1000000000;
      let buyPercent = values?.buyPercent < 5 ? values?.buyPercent : 5;
      let sellPercent = values?.sellPercent < 5 ? values?.sellPercent : 5;
      let transferPercent = values?.transferPercent < 5 ? values?.transferPercent : 5;
      setValues({
        ...values,
        token_decimals: 18,
        supply_type: "Fixed",
        initial_supply,
        maximum_supply: initial_supply,
        access_type: 'Owner',
        //////////////////////
        buyPercent,
        sellPercent,
        transferPercent,
        //////////////////////
        burnPercent: 0,
        teamPercent: 0,
        taxCurrency: "token",
        //////////////////////
        teamAddressList: [],
      });
    }
  }, [values?.token_type]);

  return (
    <Grid container spacing={block_spacing}>
      <Grid item xs={12}>
        <Box textAlign={"center"} py={15}>
          <Typography
            variant="h2"
            mb={4}
            style={{ color: theme.palette.customColors.semiwhite }}
          >
            Create your Token on{" "}
            <span style={{ color: theme.palette.success.main }}>
              {values?.network?.name ?? ""}
            </span>
          </Typography>
          <Typography variant="h5">
            Create and deploy your smart contract in minutes!
          </Typography>
          <Typography variant="h5">
            No coding or login required | verified on chain instantly | advance
            features and options
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Network_card */}
          <NetworkCard
            values={values}
            handleAutoCompleteChange={handleAutoCompleteChange}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
          />
          {/** END Network_card */}
          {/** BEGIN Informations_card */}
          <InformationsCard
            values={values}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
          />
          {/** END Informations_card */}

          {/** BEGIN Supply_card */}
          <SupplyCard
            values={values}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
          />
          {/** END Supply_card */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Options_card */}
          <OptionsCard
            values={values}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
            handleTAChange={handleTAChange}
            addNewTeamAddress={addNewTeamAddress}
            removeTeamAddress={removeTeamAddress}
          />
          {/** END Options_card */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Network_card */}
          {/* <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <LanIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Network</Typography>
              </CustomCardHeader>
            </CustomCardContent>
          </CustomCard> */}
          {/** END Network_card */}

          {/** BEGIN Agreement_card */}
          <AgreementCard
            values={values}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
          />
          {/** END Agreement_card */}

          {/** BEGIN Transaction_card */}
          <TransactionCard
            values={values}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckedChange={handleCheckedChange}
          />
          {/** END Transaction_card */}

          {/** BEGIN confirm_button */}
          <Box>
            <Button variant="contained" fullWidth color="success">
              Confirm
            </Button>
          </Box>
          {/** END confirm_button */}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
