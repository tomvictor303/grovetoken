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

interface MyCardProps {
  values: HomeState;
  handleChange: (
    prop: keyof HomeState
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (
    prop: keyof HomeState
  ) => (event: SelectChangeEvent<any>) => void;
  handleCheckedChange: (
    prop: keyof HomeState
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTAChange: (
    prop: keyof TeamAddress,
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;

  addNewTeamAddress: () => void;
  removeTeamAddress: (index: number) => void;
}

const OptionsCardTaxPart = ({
  values,
  handleChange,
  handleSelectChange,
  handleCheckedChange,
  handleTAChange,
  addNewTeamAddress,
  removeTeamAddress
}: MyCardProps) => {
  const theme = useTheme();

  const addressComponent = (
    teamAddress: TeamAddress,
    index: number,
    handleTAChange: any
  ) => (
    <>
      <Grid container spacing={4} style={{ alignItems: "center" }}>
        <Grid item xs={1} style={{ paddingTop: 0 }}>
          <Typography className={"cardheader-title"} variant="caption">
            #{index + 1}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <CustomFormControl fullWidth style={{ margin: "auto" }}>
            <OutlinedInput
              className={"control-element"}
              value={teamAddress.address}
              onChange={handleTAChange("address", index)}
              placeholder="0x..."
              type="text"
            />
          </CustomFormControl>
        </Grid>
        <Grid item xs={4}>
          <CustomFormControl fullWidth style={{ margin: "auto" }}>
            <OutlinedInput
              className={"control-element"}
              value={teamAddress.percent}
              onChange={handleTAChange("percent", index)}
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
        </Grid>
        <Grid item xs={1}>
          <DeleteOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              removeTeamAddress(index);
            }}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
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
                value={values.buyPercent}
                onChange={handleChange("buyPercent")}
                placeholder=""
                type="number"
                inputProps={{
                  min: 0,
                  max: (values.token_type < TokenType.Advance ? 5 : 100),
                  pattern: "\\d*"
                }}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </CustomFormControl>
          </Grid>
          <Grid item xs={4}>
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
                value={values.sellPercent}
                onChange={handleChange("sellPercent")}
                placeholder=""
                type="number"
                inputProps={{
                  min: 0,
                  max: (values.token_type < TokenType.Advance ? 5 : 100),
                  pattern: "\\d*"
                }}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </CustomFormControl>
          </Grid>
          <Grid item xs={4}>
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
                value={values.transferPercent}
                onChange={handleChange("transferPercent")}
                placeholder=""
                type="number"
                inputProps={{
                  min: 0,
                  max: (values.token_type < TokenType.Advance ? 5 : 100),
                  pattern: "\\d*"
                }}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </CustomFormControl>
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
                value={values.burnPercent}
                onChange={handleChange("burnPercent")}
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
          </Grid>
          <Grid item xs={6}>
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
                value={values.teamPercent}
                onChange={handleChange("teamPercent")}
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
          </Grid>
        </Grid>

        <Box marginTop={-8}>
          <FormHelperText className={"control-help"}>
            Burn + Marketing = 100%
          </FormHelperText>
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
            {values.teamAddressList.map((item: TeamAddress, index: number) => (
              <>{addressComponent(item, index, handleTAChange)}</>
            ))}
          </Box>

          {/** Add new button */}
          <Box>
            <Button variant="text" color="success" onClick={addNewTeamAddress}>
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

        <CustomFormControl fullWidth>
          <Select
            className={"control-element"}
            value={values.taxCurrency}
            onChange={handleSelectChange("taxCurrency")}
            displayEmpty
            disabled={values.token_type !== TokenType.Advance}
          >
            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
            <MenuItem value={"native"}>
              Send tax in {values.network?.currency}
            </MenuItem>
            <MenuItem value={"token"}>Send tax in Token</MenuItem>
          </Select>
          <FormHelperText className={"control-help"}>
            Select the currency to send to the team ({values.network?.currency}{" "}
            or tokens). The tax will be swapped if {values.network?.currency} is
            selected.
          </FormHelperText>
        </CustomFormControl>
      </Box>
    </>
  );
};

export default OptionsCardTaxPart;