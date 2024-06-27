// ** MUI Imports
import Grid from "@mui/material/Grid";

import { styled, useTheme } from "@mui/material/styles";
import { useForm, Controller } from 'react-hook-form';

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

  const defaultValues: HomeState = {
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
    //////////////////////
    isAgreedTerms: false,
  };
  // react-hook-form
  const { control, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm<HomeState>({
    defaultValues
  });

  const [ network, token_type, supply_type, initial_supply, maximum_supply ] = watch(['network', 'token_type', 'supply_type', 'initial_supply', 'maximum_supply']);

  // ** States
  // special change handlers
  const handleInitialSupplyChange = (newValue: string) => {
    const isValidIntegerString = /^\d*$/; // Allow numeric, empty string.
    if (!isValidIntegerString.test(newValue)) {
      return;
    }
    const new_initial_supply: number = parseInt(newValue, 10);
    /////////////////
    if ( supply_type === 'Fixed' || supply_type === 'Unlimited' ) {
      setValue('maximum_supply', new_initial_supply, { shouldValidate: true });
    } else {
      if ( new_initial_supply > maximum_supply ) {
        setValue('maximum_supply', new_initial_supply, { shouldValidate: true });
      } else {
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
    if ( new_maximum_supply < initial_supply ) {
      setValue('initial_supply', new_maximum_supply, { shouldValidate: true });
    } else {
    }
  }  

  useEffect(() => {
    let curValues: HomeState = getValues();
    // Forceful setting values for low level token_types
    if (token_type === TokenType.Basic) {
      let initial_supply = 1000000;
      reset({
        ...defaultValues,
        token_type: TokenType.Basic,
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
    if (token_type === TokenType.Custom) {
      let initial_supply = 1000000000;
      let buyPercent = curValues?.buyPercent < 5 ? curValues?.buyPercent : 5;
      let sellPercent = curValues?.sellPercent < 5 ? curValues?.sellPercent : 5;
      let transferPercent = curValues?.transferPercent < 5 ? curValues?.transferPercent : 5;
      reset({
        ...defaultValues,
        token_type: TokenType.Custom,
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
  }, [token_type]);
  // end special change handlers

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                {network?.name ?? "?"}
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
              control={control}
              errors={errors}
              watch={watch}
            />
            {/** END Network_card */}
            {/** BEGIN Informations_card */}
            <InformationsCard
              control={control} 
              errors={errors}
              watch={watch}
            />
            {/** END Informations_card */}

            {/** BEGIN Supply_card */}
            <SupplyCard
              control={control}
              errors={errors}
              watch={watch}
              handleInitialSupplyChange={handleInitialSupplyChange}
              handleMaximumSupplyChange={handleMaximumSupplyChange}
            />
            {/** END Supply_card */}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={block_spacing}>
            {/** BEGIN Options_card */}
            <OptionsCard
              control={control}
              errors={errors}
              watch={watch}
            />
            {/** END Options_card */}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={block_spacing}>
            {/** BEGIN Agreement_card */}
            <AgreementCard
              control={control}
              errors={errors}
              watch={watch}
            />
            {/** END Agreement_card */}

            {/** BEGIN Transaction_card */}
            <TransactionCard
              control={control}
              errors={errors}
              watch={watch}
            />
            {/** END Transaction_card */}

            {/** BEGIN confirm_button */}
            <Box>
              <Button type="submit" variant="contained" fullWidth color="success">
                Confirm
              </Button>
            </Box>
            {/** END confirm_button */}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default LandingPage;
