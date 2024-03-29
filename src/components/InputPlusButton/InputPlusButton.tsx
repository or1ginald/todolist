import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import s from './InputPlusButton.module.css';

import { ErrorSnackBar } from 'components';
import { setErrorLog } from 'store';
import { Nullable } from 'types';

type InputPropsType = {
  addCallBack: (title: string) => void;
  label: string;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
};

export const InputPlusButton = React.memo((props: InputPropsType) => {
  const { addCallBack, label } = props;
  const dispatch = useDispatch();

  const [inputValue, setInpVal] = useState<string>('');
  const [error, setError] = useState<Nullable<string>>(null);

  const onAddItemButtonClick = useCallback(() => {
    if (inputValue.trim()) {
      setError(null);
      addCallBack(inputValue);
      setInpVal('');
    } else {
      setError('Incorrect input');
      dispatch(setErrorLog('Input should has at least one symbol except backspace'));
    }
  }, [addCallBack, dispatch, inputValue]);

  const onTextFieldKeyPress = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        onAddItemButtonClick();
      }
    },
    [onAddItemButtonClick],
  );

  const onTextInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.currentTarget.value);
  }, []);

  return (
    <div>
      <ErrorSnackBar />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'nowrap',
        }}
      >
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          onChange={onTextInputChange}
          onKeyPress={onTextFieldKeyPress}
          error={!!error}
          value={inputValue}
          size="small"
          className={s.input}
          helperText={error}
          disabled={props.disabled}
        />

        <Button
          variant="contained"
          onClick={onAddItemButtonClick}
          className={s.button}
          disabled={props.disabled}
        >
          <AddIcon />
        </Button>
      </Box>
    </div>
  );
});
