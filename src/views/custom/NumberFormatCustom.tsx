import React from 'react';
import { NumericFormat , NumberFormatValues, InputAttributes } from 'react-number-format';
interface NumberFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<typeof NumericFormat , NumberFormatCustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat 
        {...other}
        getInputRef={ref}
        onValueChange={(values: NumberFormatValues) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator=","
      />
    );
  }
);

export default NumberFormatCustom;