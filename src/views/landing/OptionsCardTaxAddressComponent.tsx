import { Box, Grid, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormWatch } from "react-hook-form";
import { CustomFormControl } from "../custom/CustomCard";
import {
  DeleteOutline as DeleteOutlineIcon
} from "mdi-material-ui";

interface MyCardProps {
  item: FieldArrayWithId<HomeState, "teamAddressList", "id">;
  index: number;
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  fields: FieldArrayWithId<HomeState, "teamAddressList", "id">[];
  append: UseFieldArrayAppend<HomeState, "teamAddressList">;
  remove: UseFieldArrayRemove;
}

const OptionsCardTaxAddressComponent = ({
  item,
  index,
  control,
  errors,
  watch,
  fields,
  append,
  remove,
}: MyCardProps) => {

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  return <>
    <Box key={item.id}>
      <Grid container spacing={4} style={{ alignItems: "center" }}>
        <Grid item xs={1} style={{ paddingTop: 0 }}>
          <Typography className={"cardheader-title"} variant="caption">
            #{index + 1}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name={`teamAddressList.${index}.address`}
            control={control}
            rules={{
              required: 'Address is required',
              validate: address => isValidEthereumAddress(address) || 'Invalid address',
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomFormControl fullWidth style={{ margin: "auto" }}>
                <OutlinedInput
                  className={"control-element"}
                  {...field}
                  error={!!error}
                  placeholder="0x..."
                  type="text"
                />
              </CustomFormControl>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name={`teamAddressList.${index}.percent`}
            control={control}
            rules={{
              required: 'Percent is required',
              validate: value => value >= 0 || 'The percent must be greater than 0'
            }}
            render={({ field, fieldState: { error } }) => (
              <CustomFormControl fullWidth style={{ margin: "auto" }}>
                <OutlinedInput
                  className={"control-element"}
                  {...field}
                  error={!!error}
                  placeholder=""
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 100,
                    pattern: "\\d*"
                  }}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </CustomFormControl>
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <DeleteOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              remove(index);
              console.log(fields)
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ alignItems: "flex-start" }} marginTop={-5} marginBottom={3}>
        {/** BEGIN error_text_area */}
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          {errors?.teamAddressList?.[index]?.address && (<Typography variant={'caption'} color={'error'}>{errors?.teamAddressList?.[index]?.address?.message}</Typography>)}
        </Grid>
        <Grid item xs={4}>
          {errors?.teamAddressList?.[index]?.percent && (<Typography variant={'caption'} color={'error'}>{errors?.teamAddressList?.[index]?.percent?.message}</Typography>)}
        </Grid>
        <Grid item xs={1}></Grid>
        {/** END error_text_area */}
      </Grid>
    </Box>
  </>
};

export default OptionsCardTaxAddressComponent;