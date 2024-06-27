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
import { ChangeEvent } from "react";
import IOSSwitch from "../custom/IOSSwitch";
import { styled, useTheme } from "@mui/material/styles";
import OptionsCardSwitchPart from "./OptionsCardSwitchPart";
import OptionsCardTaxPart from "./OptionsCardTaxPart";
import OptionsCardFinalPart from "./OptionsCardFinalPart";
import { Control, Controller, FieldArrayWithId, FieldErrors, FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFormWatch } from 'react-hook-form';

interface MyCardProps {
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  fields: FieldArrayWithId<HomeState, "teamAddressList", "id">[];
  append: UseFieldArrayAppend<HomeState, "teamAddressList">;
  remove: UseFieldArrayRemove;
}

const OptionsCard = ({
  control,
  errors,
  watch,
  fields,
  append,
  remove,
}: MyCardProps) => {
  const theme = useTheme();
  const [network, token_type, supply_type, isTax] = watch(['network', 'token_type', 'supply_type', 'isTax']);

  return (
    <>
      <CustomCard>
        <CustomCardContent>
          <CustomCardHeader>
            <TuneIcon className={"cardheader-icon"} />
            <Typography className={"cardheader-title"} variant="h4">
              Options
            </Typography>
          </CustomCardHeader>

          {/** BEGIN Options_card_switch_part */}
          <OptionsCardSwitchPart
            control={control}
            errors={errors}
            watch={watch}
          />
          {/** END Options_card_switch_part */}

          {/** BEGIN Options_card_tax_part */}
          {isTax ? (
            <OptionsCardTaxPart
              control={control}
              errors={errors}
              watch={watch}
              fields={fields} 
              append={append} 
              remove={remove}
            />
          ) : (
            <></>
          )}
          {/** END Options_card_tax_part */}

          {/** BEGIN Options_card_final_part */}
          <OptionsCardFinalPart
            control={control}
            errors={errors}
            watch={watch}
          />
          {/** END Options_card_final_part */}
        </CustomCardContent>
      </CustomCard>
    </>
  );
};

export default OptionsCard;