import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
  CustomFormControl
} from "src/views/custom/CustomCard";
import React from "react";
import {
  MonitorShimmer as MonitorShimmerIcon,
  TruckOutline as TruckOutlineIcon,
  Tune as TuneIcon,
  Lan as LanIcon,
  FountainPenTip as FountainPenTipIcon,
  WindowShutterSettings as WindowShutterSettingsIcon,
  InformationOutline as InformationOutlineIcon,
  PlusCircleOutline as PlusCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon
} from "mdi-material-ui";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
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
import { TokenType } from "src/utils/enums";
import { Control, Controller, FieldArrayWithId, FieldErrors, FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFormWatch } from 'react-hook-form';
import OptionsCardTaxAddressComponent from "./OptionsCardTaxAddressComponent";

interface MyCardProps {
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  fields: FieldArrayWithId<HomeState, "teamAddressList", "id">[];
  append: UseFieldArrayAppend<HomeState, "teamAddressList">;
  remove: UseFieldArrayRemove;
}

const OptionsCardTaxPart = ({
  control,
  errors,
  watch,
  fields,
  append,
  remove,
}: MyCardProps) => {
  const theme = useTheme();
  const [network, token_type, supply_type, isTax, burnPercent, teamPercent, teamAddressList] = watch(['network', 'token_type', 'supply_type', 'isTax', 'burnPercent', 'teamPercent', 'teamAddressList']);

  const totalPercent = teamAddressList.reduce((sum, item) => sum + (Number(item.percent) || 0), 0);
  
  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Controller
              name="buyPercent"
              control={control}
              rules={{
                required: 'Please fill the field',
                validate: value => value >= 0 || 'The tax must be greater than 0'
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomFormControl fullWidth>
                  <Typography className={"control-title"} variant="caption">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box>Buy</Box>
                      <Tooltip
                        title="% of tax collected when a user buy coins"
                        className="cursorPoint"
                      >
                        <InformationOutlineIcon
                          className="extra-small-icon"
                          color="success"
                        />
                      </Tooltip>
                    </Stack>
                  </Typography>
                  <OutlinedInput
                    className={"control-element"}
                    {...field}
                    error={!!error}
                    placeholder=""
                    type="number"
                    inputProps={{
                      min: 0,
                      max: (token_type < TokenType.Advance ? 5 : 100),
                      pattern: "\\d*"
                    }}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  />
                  {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
                </CustomFormControl>
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="sellPercent"
              control={control}
              rules={{
                required: 'Please fill the field',
                validate: value => value >= 0 || 'The tax must be greater than 0'
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomFormControl fullWidth>
                  <Typography className={"control-title"} variant="caption">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box>Sell</Box>
                      <Tooltip
                        title="% of tax collected when a user sell coins"
                        className="cursorPoint"
                      >
                        <InformationOutlineIcon
                          className="extra-small-icon"
                          color="success"
                        />
                      </Tooltip>
                    </Stack>
                  </Typography>
                  <OutlinedInput
                    className={"control-element"}
                    {...field}
                    error={!!error}
                    placeholder=""
                    type="number"
                    inputProps={{
                      min: 0,
                      max: (token_type < TokenType.Advance ? 5 : 100),
                      pattern: "\\d*"
                    }}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  />
                  {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
                </CustomFormControl>
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="transferPercent"
              control={control}
              rules={{
                required: 'Please fill the field',
                validate: value => value >= 0 || 'The tax must be greater than 0'
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomFormControl fullWidth>
                  <Typography className={"control-title"} variant="caption">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box>Transfer</Box>
                      <Tooltip
                        title="% of tax collected when a user transfer coins"
                        className="cursorPoint"
                      >
                        <InformationOutlineIcon
                          className="extra-small-icon"
                          color="success"
                        />
                      </Tooltip>
                    </Stack>
                  </Typography>
                  <OutlinedInput
                    className={"control-element"}
                    {...field}
                    error={!!error}
                    placeholder=""
                    type="number"
                    inputProps={{
                      min: 0,
                      max: (token_type < TokenType.Advance ? 5 : 100),
                      pattern: "\\d*"
                    }}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  />
                  {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
                </CustomFormControl>
              )}
            />
          </Grid>
        </Grid>
        <CustomFormControl fullWidth>
          <Typography
            variant="caption"
            align="center"
            color={theme.palette.customColors.semiwhite}
          >
            Breakdown of Taxes
          </Typography>
        </CustomFormControl>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Controller
              name="burnPercent"
              control={control}
              rules={{
                required: 'Please fill the field',
                validate: value => value >= 0 || 'The ratio must be greater than 0'
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomFormControl fullWidth>
                  <Typography className={"control-title"} variant="caption">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box>Burn</Box>
                      <Tooltip
                        title="Burn goes to the dead wallet"
                        className="cursorPoint"
                      >
                        <InformationOutlineIcon
                          className="extra-small-icon"
                          color="success"
                        />
                      </Tooltip>
                    </Stack>
                  </Typography>
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
                  {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
                </CustomFormControl>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="teamPercent"
              control={control}
              rules={{
                required: 'Please fill the field',
                validate: value => value >= 0 || 'The ratio must be greater than 0'
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomFormControl fullWidth>
                  <Typography className={"control-title"} variant="caption">
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Box>Team</Box>
                      <Tooltip
                        title="Team is specified by owner as Marketing / Owner or some other wallet desired."
                        className="cursorPoint"
                      >
                        <InformationOutlineIcon
                          className="extra-small-icon"
                          color="success"
                        />
                      </Tooltip>
                    </Stack>
                  </Typography>
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
                  {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
                </CustomFormControl>
              )}
            />
          </Grid>
        </Grid>

        <Box marginTop={-8}>
          <FormHelperText className={"control-help"}>
            Burn + Marketing = {Number(burnPercent) + Number(teamPercent)}%
          </FormHelperText>
          {Number(burnPercent) + Number(teamPercent) !== 100 && (
            <Typography variant={'caption'} color={'error'}>
              The total must be 100%!
            </Typography>
          )}
        </Box>

        {/** BEGIN TEAM_ADDRESS_block_in_Options_card_tax_part*/}
        <Box marginBottom={4} marginTop={8}>
          <Typography className={"control-title"} variant="caption">
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Box>TEAM ADDRESS</Box>
              <Tooltip
                title="Specify which addresses should receive a percentage of the Team Tax Alloction"
                className="cursorPoint"
              >
                <InformationOutlineIcon
                  className="extra-small-icon"
                  color="success"
                />
              </Tooltip>
            </Stack>
          </Typography>

          {/** address list*/}
          <Box marginTop={4}>
            {fields.map((item, index) => (<>
              <OptionsCardTaxAddressComponent
                item={item}
                index={index}
                control={control}
                errors={errors}
                watch={watch}
                fields={fields}
                append={append}
                remove={remove}
              />
            </>))}
          </Box>

          {fields.length !== 0 && totalPercent !== 100 && (
            <Box marginTop={2}>
              <Typography variant={'caption'} color={'error'}>
                The total of the addresses shares must be 100%!
              </Typography>
            </Box>
          )}


          {/** Add new button */}
          <Box>
            <Button variant="text" color="success" onClick={() => { append({ address: '', percent: 0 }) }}>
              <PlusCircleOutlineIcon />
              &nbsp;&nbsp;
              <Typography
                variant="body2"
                style={{
                  display: "inline",
                  color: theme.palette.success.main,
                  textDecoration: "underline"
                }}
              >
                Add a new address
              </Typography>
            </Button>
          </Box>
        </Box>
        {/** END TEAM_ADDRESS_block_in_Options_card_tax_part */}

        <Controller
          name="taxCurrency"
          control={control}
          rules={{ required: 'Please fill the field' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Select
                className={"control-element"}
                {...field}
                error={!!error}
                displayEmpty
                disabled={token_type !== TokenType.Advance}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={"native"}>
                  Send tax in {network?.currency}
                </MenuItem>
                <MenuItem value={"token"}>Send tax in Token</MenuItem>
              </Select>
              <FormHelperText className={"control-help"}>
                Select the currency to send to the team ({network?.currency}{" "}
                or tokens). The tax will be swapped if {network?.currency} is
                selected.
              </FormHelperText>
              {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
            </CustomFormControl>
          )}
        />
      </Box>
    </>
  );
};

export default OptionsCardTaxPart;