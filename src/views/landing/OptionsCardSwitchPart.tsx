import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
  CustomFormControl
} from "src/views/custom/CustomCard";
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
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import IOSSwitch from "../custom/IOSSwitch";
import { styled, useTheme } from "@mui/material/styles";
import { TokenType } from "src/utils/enums";
import { Control, Controller, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';

interface MyCardProps {
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
}

const OptionsCardSwitchPart = ({
  control,
  errors,
  watch,
}: MyCardProps) => {
  const theme = useTheme();
  const [network, token_type, supply_type, isTax] = watch(['network', 'token_type', 'supply_type', 'isTax']);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  useEffect(() => {
    setIsBrowser(true);
  }, [])

  return (
    <>
      <Box>
        <Controller
          name="isConformedERC20"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={true}
                />
                <Typography className={"control-switch-title"}>
                  Conforms to ERC20 protocol
                </Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Your token will const all the functionalities, and conforms to ERC20
                protocol
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isVerifiedOnEtherscan"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={true}
                />
                {
                  isBrowser && (
                    <Typography className={"control-switch-title"}>
                      Verified on {network?.scan_name}
                    </Typography>
                  )
                }
              </Stack>
              <FormHelperText className={"control-help"}>
                Your token will const all the functionalities, and conforms to ERC20
                protocol
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isNoCopyrightLink"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={token_type < TokenType.Advance}
                />
                <Typography className={"control-switch-title"}>
                  No copyright link
                </Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                This weblink will be added in the description of your smart contract ( Basic and Custom only)

              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isMintable"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <Typography className={"control-switch-title"}>Mintable</Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Allow the creation of new tokens in the future
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isBurnable"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <Typography className={"control-switch-title"}>Burnable</Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Allow your tokens to be burned
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isPausable"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <Typography className={"control-switch-title"}>Pausable</Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Allow your tokens to be paused
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="isRecoverable"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <Typography className={"control-switch-title"}>
                  Recoverable
                </Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Allow to recover any ERC20 tokens sent to your contract
              </FormHelperText>
            </CustomFormControl>
          )}
        />

        <Controller
          name="isAntiWhale"
          control={control}
          render={({ field, fieldState: { error } }) => (
            < CustomFormControl fullWidth >
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <Typography className={"control-switch-title"}>
                  Anti Whale
                </Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Limit the maximum token holding per wallet.
              </FormHelperText>
            </CustomFormControl >
          )}
        />
        <Controller
          name="isTax"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Stack
                className={"control-element"}
                direction={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <IOSSwitch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={token_type === TokenType.Basic}
                />
                <Typography className={"control-switch-title"}>Tax</Typography>
              </Stack>
              <FormHelperText className={"control-help"}>
                Add a tax on transactions.
              </FormHelperText>
            </CustomFormControl>
          )}
        />
      </Box >
    </>
  );
};

export default OptionsCardSwitchPart;