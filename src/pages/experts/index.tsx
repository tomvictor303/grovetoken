// ** MUI Imports
import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Pagination, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { capitalizeFirstLetterOfEachWord } from 'src/utils/custom';
import { expertises, getCountryObject, getExpertiseObject } from 'src/utils/constants';
import StarIcon from 'mdi-material-ui/Star'
import MessageToExpertModal from 'src/views/experts/MessageToExpertModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FilterState {
  name: string
  expertise: string
  sort_by: '' | 'most_rated' | 'most_recent'
}

interface TempValuesState {
  temp_name: string
}

const ExpertsPage = () => {
  const dispatch = useAppDispatch();
  // ** States
  const [ experts, setExperts ] = useState<Array<any>>([]);
  const [ selectedExpert, setSelectedExpert ] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  let params: any = typeof window !== 'undefined' ? new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  }) : null;
  
  const [values, setValues] = useState<FilterState>({
    name: params?.name ?? '',
    expertise: params?.expertise ?? '',
    sort_by: 'most_rated',
  })

  const [tempValues, setTempValues] = useState<TempValuesState>({
    temp_name: params?.name ?? '',
  })

  useEffect(() => {
    load_data();
    setCurrentPage(1);
  }, [values]);

  const load_data = () => {    
    const queryParams = new URLSearchParams(values as any).toString();

    fetch(`${API_URL}/experts?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.success) {
        setExperts(data.results); 
      } else {        
        setExperts([]);
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
  }

  // BEGIN pagination_logic
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExperts = experts.slice(startIndex, endIndex);
  // END pagination_logic

  const handleFilterChange = (prop: keyof FilterState) => (event: any) => {
    setValues((prev) => {return { ...prev, [prop]: event.target.value };})
  }

  const handleTempValuesChange = (prop: keyof TempValuesState) => (event: any) => {
    setTempValues((prev) => {return { ...prev, [prop]: event.target.value };})
  }

  const handleTemp2FilterOnEnterPress = (event: any, from: string, to: string) => {
    if (event.key === 'Enter') {
      // Execute your search or filter logic here
      // You can call a function or perform any action you want on Enter press
      setValues((prev) => {
        return { 
          ...prev, 
          [to]: (tempValues as any)?.[from],
        };
      })
    }
  };

  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const handleMsgModalOpen = (expert: any) => { 
    if (expert) {
      setSelectedExpert(expert);
      setMsgModalOpen(true);
    }
  }
  const handleMsgModalClose = () => setMsgModalOpen(false);

  return (<>
    <Box maxWidth={'1200px'} style={{margin: '0 auto'}}>
      <Stack direction={'row'} spacing={2}>
        {/** name, category filter, right side: sort */}
        <FormControl>
          <Typography variant='body2'>Search</Typography>
          <TextField type='name' sx={{ marginBottom: 4 }}
            placeholder='Search by name'
            value={tempValues.temp_name}
            // For temp values, use onInput, instead of onChange
            onInput={handleTempValuesChange('temp_name')}
            onKeyDown={(e) => handleTemp2FilterOnEnterPress(e, 'temp_name', 'name')}
          />
        </FormControl>
        <FormControl>
          <Typography variant='body2'>Expertise</Typography>
          <Select 
            value={values.expertise}
            onChange={handleFilterChange('expertise')}
            style={{minWidth: 150}}
          >
            <MenuItem value={""}>All</MenuItem>
            { expertises.map((expertise: ExpertiseType, index: number) => 
              <MenuItem key={index} value={expertise.code}>{expertise.label}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl>
          <Typography variant='body2'>Sort by</Typography>
          <Select
            value={values.sort_by}
            onChange={handleFilterChange('sort_by')}
          >
            <MenuItem value={'most_rated'}>Most rated</MenuItem>
            <MenuItem value={'most_recent'}>Most recent</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Grid container spacing={4}>
        {paginatedExperts.map((expert, index: number) => (
          <Grid key={index} item xs={12} md={3}>
            <Card>
              <CardContent>
                <Stack alignItems={'center'} spacing={2}>
                  <Avatar
                    alt={`${expert.first_name} ${expert.last_name}`}
                    src={expert.avatar ?? '/images/avatars/1.png'}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography variant='h6'>{expert.first_name} {expert.last_name}</Typography>

                  <Stack direction='row' alignItems={'center'} justifyContent={'center'} spacing={2}>
                    <Typography>{getExpertiseObject( expert.expert_expertise )?.name ?? 'Unknown'}</Typography>
                    <Box>
                      <Tooltip title={getCountryObject(expert.country)?.label ?? 'Unknown'}>
                        <img
                            className={'cursorPoint'}
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${expert.country?.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${expert.country?.toLowerCase()}.png`}
                            alt=""
                          />
                      </Tooltip>
                    </Box>
                  </Stack>

                  <Stack direction='row' alignItems={'center'} justifyContent={'center'} spacing={1}>
                    <StarIcon color='primary'/>
                    <Typography>{expert.expert_rating} /10 ({expert.expert_rating_count} jobs)</Typography>
                  </Stack>

                  <Box pt={2}>
                    <Button variant='contained' onClick={()=>{handleMsgModalOpen(expert)}}>Message</Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(experts.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 4 }}
      />
    </Box>

    <MessageToExpertModal open={msgModalOpen} expert={selectedExpert} onClose={handleMsgModalClose}/>
  </>)
}

export default ExpertsPage
