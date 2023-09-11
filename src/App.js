import logo from './logo.svg';
import './App.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Menu, MenuItem, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState, forwardRef } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import shortUUID from 'short-uuid';
function App() {
  /** ----------------Alert state--------------------------------- */
  const [column, setColumn] = useState({
    display_name: '',
    column_type: '',
    filter: '',
    id: ''
  })
  /** ----------------Alert state--------------------------------- */
  const [columnArray, setColumnArray] = useState([])
  const [rowArray, setRowArray] = useState([])

  /**------------ col action functions ------------- */
  const [openColAction, setOpenColAction] = useState(null)
  /**------------ col action functions ------------- */

  /**------------ Row action functions ------------- */
  const [openRowAction, setOpenRowAction] = useState(null)
  /**------------ Row action functions ------------- */

  /** ----------------Alert functions--------------------------------- */
  const [alertState, setAlertState] = useState({
    openAlert: false,
    vertical: 'top',
    horizontal: 'right',
    message: ''
  })
  const { vertical, horizontal, openAlert, message } = alertState

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const closeAlert = () => {
    setAlertState((prev) => {
      return {
        ...prev, openAlert: false
      }
    })
  }
  /** ----------------Alert functions--------------------------------- */

  /**------------ Col action functions ------------- */
  const colActionOpen = (event) => {
    setOpenColAction(event.currentTarget);
  };
  const colActionClose = () => {
    setOpenColAction(null);
  };
  /**------------ Col action functions ------------- */

  /**------------ Row action functions ------------- */
  const rowActionOpen = (event) => {
    setOpenRowAction(event.currentTarget);
  };
  const rowActionClose = () => {
    setOpenRowAction(null);
  };
  /**------------ Row action functions ------------- */

  /** --------------------Add new column---------------- */
  const handleColAdd = (name) => (value) => {
    setColumn({
      ...column,
      [name]: value
    })
  }

  const addColumn = () => {
    if (!column.display_name && !column.column_type && !column.filter) {
      setAlertState((prev) => {
        return {
          ...prev,
          openAlert: true,
          message: 'Column name can not be empty'
        }
      })
    } else {
      setColumn({
        display_name: '',
        column_type: '',
        filter: '',
        id: ''
      })
      const newColumn = {
        ...column,
        id: shortUUID.generate()
      }
      setColumnArray((prev) => {
        return [...prev, newColumn]
      })
      if (rowArray.length === 0) {
        setRowArray((prev) => {
          return [...prev, prev.length + 1]
        })
      }
    }
  }

  /** --------------------Add new column---------------- */

  /** --------------------Add new row---------------- */

  const addRow = () => {
    if (columnArray.length === 0) {
      setAlertState((prev) => {
        return {
          ...prev,
          openAlert: true,
          message: 'Create atleast one column'
        }
      })
    } else {
      setRowArray((prev) => {
        return [...prev, prev.length + 1]
      })
    }
  }

  /** --------------------Add new row---------------- */
  return (
    <div className="App">
      {/* ---------------Alert area------------------ */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openAlert}
        onClose={closeAlert}
        key={vertical + horizontal}
      >
        <Alert onClose={closeAlert} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {/* ---------------Alert area------------------ */}

      {/* ----------------------Column menu area------------------------ */}
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={openColAction}
        open={Boolean(openColAction)}
        onClose={colActionClose}
      >
        <MenuItem onClick={colActionClose}>
          <ModeEditOutlineOutlinedIcon /> View/update column Details
        </MenuItem>
        <MenuItem onClick={colActionClose}>
          <ContrastOutlinedIcon /> Column formula
        </MenuItem>
        <MenuItem onClick={colActionClose}>
          <DeleteOutlineOutlinedIcon />Remove formula
        </MenuItem>
        <MenuItem onClick={colActionClose}>
          <ModeEditOutlineOutlinedIcon />Insert column left
        </MenuItem>
        <MenuItem onClick={colActionClose}>
          <ModeEditOutlineOutlinedIcon />Insert column right
        </MenuItem>
        <MenuItem onClick={colActionClose}>
          <DeleteOutlineOutlinedIcon />Delete column
        </MenuItem>
      </Menu>
      {/* ----------------------Column menu area-------------------------- */}

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={openRowAction}
        open={Boolean(openRowAction)}
        onClose={rowActionClose}
      >
        <MenuItem onClick={rowActionClose}>
          <DeleteOutlineOutlinedIcon />Remove row
        </MenuItem>
        <MenuItem onClick={rowActionClose}>
          <ModeEditOutlineOutlinedIcon />Insert column left
        </MenuItem>
        <MenuItem onClick={rowActionClose}>
          <ModeEditOutlineOutlinedIcon />Insert column right
        </MenuItem>

      </Menu>

      <div style={{ marginTop: '1em' }}>
        <TextField style={{ marginTop: '1em', marginLeft: '1em' }} id="outlined-basic" variant="outlined" value={column.display_name} label='Display name' onChange={(e) => {
          handleColAdd('display_name')(e.target.value)
        }} />
        <TextField style={{ marginTop: '1em', marginLeft: '1em' }} id="outlined-basic" variant="outlined" value={column.column_type} label='Type' onChange={(e) => {
          handleColAdd('column_type')(e.target.value)
        }} />

        <TextField style={{ marginTop: '1em', marginLeft: '1em' }} id="outlined-basic" variant="outlined" value={column.filter} label='Filter' onChange={(e) => {
          handleColAdd('filter')(e.target.value)
        }} />
        <Button variant='contained' style={{ marginTop: '2em', marginLeft: '1em' }} onClick={addColumn}>Add New Column</Button>

      </div>

      <div style={{ float: 'left', marginLeft: '2em' }}>
        <Button variant='contained' style={{ margin: '1em' }} onClick={addRow}>Add New Row</Button>
      </div>
      {JSON.stringify(columnArray)}
      <div style={{ margin: '2em' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table" stickyHeader>
            <TableHead>
              <TableRow>
                {columnArray.length > 0 && <TableCell>Action</TableCell>}
                {columnArray.map((col, key) => (
                  <TableCell key={key} >{col.display_name}<MoreVertOutlinedIcon onClick={colActionOpen} /></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowArray.map((row) => (
                <TableRow
                  key={row}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <MoreVertOutlinedIcon onClick={rowActionOpen} />
                  </TableCell>
                  {
                    columnArray.map((col, key) => (
                      <TableCell key={key}>

                        <TextField id="outlined-basic" variant="outlined" size='small' />
                      </TableCell>
                    ))

                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


    </div>
  );
}

export default App;
