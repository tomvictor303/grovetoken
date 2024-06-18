// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import { Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, TablePagination, Stack, Avatar, Box, Typography, Tooltip, Chip, Button} from '@mui/material'
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { capitalizeFirstLetterOfEachWord, date2str } from 'src/utils/custom';
import { expertises, getCountryObject, getExpertiseObject } from 'src/utils/constants';
import StarIcon from 'mdi-material-ui/Star'

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import RateAnswerModal from './RateAnswerModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ClientDashboardQuestionsTable = () => {
  const dispatch = useAppDispatch();
  // ** States
  const [ list, setList ] = useState<Array<any>>([]);
  const [ selectedQuestion, setSelectedQuestion ] = useState<any>(null);
  const [ selectedExpert, setSelectedExpert ] = useState<any>(null);
  const [ selectedSolution, setSelectedSolution ] = useState<any>(null);

  const load_data = () => {
    fetch(API_URL + '/questions/my_questions')
    .then((response) => response.json())
    .then((data) => {
      if(data.success) {
        setList(data.results);
      } else { 
        setList([]);
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
  }

  useEffect(() => {
    load_data();
  }, [])

  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const handleMsgModalOpen = (row: any) => { 
    if (row) {
      setSelectedQuestion(row);
      setSelectedExpert({
        id: row.expert_id,
        first_name: row.expert_first_name,
        last_name: row.expert_last_name,
        avatar: row.expert_avatar,
        country: row.expert_country,
        expert_expertise: row.expert_expertise
      });
      setSelectedSolution(
        row.solution_id ? 
        {
          id: row.solution_id,
          content: row.solution_content,
          rating: row.solution_rating,
          created_at: row.solution_created_at,
        } : null
      );
      setMsgModalOpen(true);
    }
  }  
  const handleMsgModalClose = () => setMsgModalOpen(false);
  const handleMsgModalSubmitSuccess = () => {
    load_data();
    handleMsgModalClose();
  }

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'expert_id',
      headerName: 'Expert',
      flex: 2,
      editable: false,
      renderCell: (params: GridRenderCellParams<any>) => {
        let row = params.row;
        return (<>
          <Stack direction='row' alignItems={'center'} spacing={4}>                
            <Avatar
              alt={`${row.expert_first_name} ${row.expert_last_name}`}
              src={row.expert_avatar ?? '/images/avatars/1.png'}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography variant='body1'>{`${row.expert_first_name} ${row.expert_last_name}`}</Typography>
              <Stack direction='row' alignItems={'center'} spacing={2}>
                <Typography variant='caption'>{getExpertiseObject( row.expert_expertise )?.name ?? 'Unknown'}</Typography>
                <Box>
                  <Tooltip title={getCountryObject(row.expert_country)?.label ?? 'Unknown'}>
                    <img
                        className={'cursorPoint'}
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${row.expert_country?.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${row.expert_country?.toLowerCase()}.png`}
                        alt=""
                      />
                  </Tooltip>
                </Box>
              </Stack>
            </Box>
          </Stack>        
        </>);
      },
    },
    {
      field: 'content',
      headerName: 'Question',
      flex: 2,
      editable: false,
      // renderCell: (params: GridRenderCellParams<any>) => {
      //   let formatted_value = params.value ? date2str(new Date(params.value)) : ''
      //   return (
      //     <a href={`${BASE_PATH}/importers/edit/${params.row.source_connection}`}>{params.value}</a>
      //   );
      // },
    },
    {
      field: 'created_at', 
      headerName: 'Sent at',
      flex: 1,
      editable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params: GridRenderCellParams<any>) => {
        return date2str(new Date(params.value));
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.5,
      editable: false,
      renderCell: (params: GridRenderCellParams<any>) => {
        var row = params.row;
        if ( !row.solution_id ) {
          return <><Button variant="contained" color="primary" onClick={()=>{handleMsgModalOpen(row);}}>Waiting Answer</Button></>
        } else {
          if ( row.solution_rating ) {
            return <><Button variant="contained" color="success" onClick={()=>{handleMsgModalOpen(row);}}>Answer Rated</Button></>
          } else {
            return <><Button variant="contained" color="error" onClick={()=>{handleMsgModalOpen(row);}}>Answer Arrived</Button></>
          }
        }
      },
    },
  ];

  return (<>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={list}
        columns={columns}
        autoHeight 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
          sorting: {
            sortModel: [{ field: 'created_at', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[100]}
        disableRowSelectionOnClick
        rowHeight={60}
      />
    </Paper>
    <RateAnswerModal open={msgModalOpen} 
      expert={selectedExpert} question={selectedQuestion} solution={selectedSolution}
      onClose={handleMsgModalClose} onSuccess={handleMsgModalSubmitSuccess}
    />
  </>)
}

export default ClientDashboardQuestionsTable
