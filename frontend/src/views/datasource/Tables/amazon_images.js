import { useEffect, useState } from 'react';

// material-ui
import { Grid, Divider, Button } from '@mui/material';

import useAuth from 'hooks/useAuth';

// project imports
import { gridSpacing } from 'store/constant';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
// ==============================|| DEFAULT DASHBOARD ||============================== //

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Collapse, IconButton, Stack, Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    TablePagination,
    Toolbar,
    Typography,
    Checkbox,
    TableSortLabel,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem
     } from '@mui/material';
    
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { CSVExport } from './TableExports';
import { header } from './TableBasic';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

// table data    
function createData(main_category, middle_category, subcategory, name, image_type, image_size, image_extension,source, image_path, image_url, created_date ) {
    return {
        main_category, middle_category, subcategory, name, image_type, image_size, image_extension, source, image_path, image_url, created_date
    };
}


// table filter
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


// table header
const headCells = [
    {
        id: 'main_category',
        numeric: false,
        disablePadding: false,
        label: 'Main Category'
    },
    {
        id: 'middle_category',
        numeric: false,
        disablePadding: false,
        label: 'Middle Category'
    },
    {
        id: 'subcategory',
        numeric: false,
        disablePadding: false,
        label: 'Subcategory'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'image_type',
        numeric: false,
        disablePadding: false,
        label: 'Image Type'
    },
    {
        id: 'image_size',
        numeric: false,
        disablePadding: false,
        label: 'Image Size'
    },    
    {
        id: 'image_extension',
        numeric: false,
        disablePadding: false,
        label: 'Image Extension'
    },
    {
        id: 'source',
        numeric: false,
        disablePadding: false,
        label: 'Source'
    },
    {
        id: 'image_path',
        numeric: false,
        disablePadding: false,
        label: 'Image'
    },
    // {
    //     id: 'image_url',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Url'
    // },    
    {
        id: 'created_date',
        numeric: false,
        disablePadding: false,
        label: 'Date'
    }
];


// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE - HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected, project, setProject, setOpen, fetchProductImages }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >        
        {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Product Details
            </Typography>
        )}
        <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel htmlFor="project-select">Main Category</InputLabel>
            <Select
                id="project"
                name="project"
                value={project}
                onChange={async (e) => {
                    setProject(e.target.value);
                    fetchProductImages('amazon',e.target.value);
                }}
                label="Project"
            >            
                <MenuItem value={'Hull'}>Hull</MenuItem>
                <MenuItem value={'Engine'}>Engine</MenuItem>
                <MenuItem value={'Electrical and Electronic'}>Electrical and Electronic</MenuItem>
                <MenuItem value={'의장부 (Ship rig - outfit)'}>Ship rig / Outfit</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" size="small" onClick={() => { setOpen(true) }}>
            Upload
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        )}        
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    project: PropTypes.string.isRequired,
    setProject: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    fetchProductImages: PropTypes.func.isRequired
};

const Tables = () => {
    const [isLoading, setLoading] = useState(true);
    const [isOpen, setOpen] = useState(false); 
    const [rows, setRows] = useState([]); 
    
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('main_category');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedValue, setSelectedValue] = React.useState([]);

    const [project, setProject] = React.useState('Hull')

    const { insertProductImages, fetchProductImages, dataProductImages, isLoadingProduct } = useAuth();
    
    // let rows = []

    useEffect(() => {
        // setLoading(false);
        fetchProductImages('amazon',project);                                  
    }, []);        

    useEffect(() => {
        // console.log(dataProductImages)
        // console.log('OK')
        if(dataProductImages?.["data"]?.length > 0){        
            // Allrows = dataProductImages?.["data"]
            let arr_ = []
            // console.log(dataProductImages)
            // console.log(Object.keys(dataProductImages?.["data"]))
            dataProductImages?.["data"]?.map((data_, index_) => {                
                arr_.push(createData(
                    data_?.['main_category'],
                    data_?.['middle_category'],
                    data_?.['subcategory'],
                    data_?.['name'],
                    data_?.['image_type'],
                    data_?.['image_size'],
                    data_?.['image_extension'],
                    data_?.['source'],
                    data_?.['image_path'],
                    data_?.['image_url'],
                    data_?.['created_date']  
                ))
            })
            
            // console.log(arr_)
            setRows(arr_)
            // setRows(Allrows?.filter((data, index) => {
            //     if(data['main_category'].replace('/','-') === project){
            //         // console.log(data)
            //         return data
            //     }
            // }))
            // console.log(dataProductImages?.["data"][0][Object.keys(dataProductImages?.["data"][0])])            
        }
    }
    ,[dataProductImages, project])

    // const rows =  [
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Donut', 452, 25.0, 51, 4.9),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Honeycomb', 408, 3.2, 87, 6.5),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Jelly Bean', 375, 0.0, 94, 0.0),
    //     createData('KitKat', 518, 26.0, 65, 7.0),
    //     createData('Lollipop', 392, 0.2, 98, 0.0),
    //     createData('Marshmallow', 318, 0, 81, 2.0),
    //     createData('Nougat', 360, 19.0, 9, 37.0),
    //     createData('Oreo', 437, 18.0, 63, 4.0)
    // ];
    

    const fields = [
        {
          label: "Main Category",
          key: "main_category",
          fieldType: {
            type: "input",
          },
          example: "의장부 (Ship rig / outfit)",
          validations: [
            {
              rule: "required",
              errorMessage: "Main Category is required",
              level: "error",
            },
          ],
        },
        {
            label: "Middle Category",
            key: "middle_category",
            fieldType: {
              type: "input",
            },
            example: "Unloading gear",
            validations: [
              {
                rule: "required",
                errorMessage: "Middle Category is required",
                level: "error",
              },
            ],
          },
          {
            label: "Subcategory",
            key: "subcategory",
            fieldType: {
              type: "input",
            },
            example: "Crane Winch",
            validations: [
              {
                rule: "required",
                errorMessage: "Subcategory is required",
                level: "error",
              },
            ],
          },{
            label: "Name",
            key: "name",
            fieldType: {
              type: "input",
            },
            example: "Relay Box for Windlasses",
            validations: [
              {
                rule: "required",
                errorMessage: "Name is required",
                level: "error",
              },
            ],
          },{
            label: "Image Type",
            key: "image_type",
            fieldType: {
              type: "input",
            },
            example: "RGB",
            validations: [
              {
                rule: "required",
                errorMessage: "Image Type is required",
                level: "error",
              },
            ],
          },{
            label: "Image Size",
            key: "image_size",
            fieldType: {
              type: "input",
            },
            example: "(61,85)",
            validations: [
              {
                rule: "required",
                errorMessage: "Image Size is required",
                level: "error",
              },
            ],
          },{
            label: "Image Extension",
            key: "image_extension",
            fieldType: {
              type: "input",
            },
            example: "amazon",
            validations: [
              {
                rule: "required",
                errorMessage: "Image Extension is required",
                level: "error",
              },
            ],
          },{
            label: "Image Path",
            key: "image_path",
            fieldType: {
              type: "input",
            },
            example: "https://kmou-dp.s3.ap-southeast-1.amazonaws.com/Marine-Parts/amazon/Hull/0b929c64a3bce60d11208aa693b59e1d3ff3dc48.jpg",
            validations: [
              {
                rule: "required",
                errorMessage: "Image Path is required",
                level: "error",
              },
            ],
          },{
            label: "Image URL",
            key: "image_url",
            fieldType: {
              type: "input",
            },
            example: "https://media1.svb-media.de/media/snr/510586/images/fullsize/img_2018-07-05_10-16-32_7b5d99a7c06400270301ac55a7c1a271.JPG",
          },{
            label: "Source",
            key: "source",
            fieldType: {
              type: "input",
            },
            example: "amazon",
          },{
            label: "DataInfo",
            key: "created_date",
            fieldType: {
              type: "input",
            },
            example: "2022-12-29 01:53:00",
          }
      ] 

    const onSubmit = (data, file) => {
        insertProductImages(data,'amazon',project)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        const selectedRowData = rows.filter((row) => newSelected.includes(row.name.toString()));
        setSelectedValue(selectedRowData);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
      		
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>      
            <MainCard
                content={false}
                title="Data Tables"                
                secondary={
                    <Stack direction="row" justifyContent={"left"} spacing={2} alignItems="center">                                                
                        <CSVExport data={selectedValue.length > 0 ? selectedValue : rows} filename="data-tables.csv" header={header} />
                        <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                    </Stack>
                }
            >                 
            {/* table */}
            <ReactSpreadsheetImport
                isOpen={isOpen}
                onClose={() => { setOpen(false) }}
                onSubmit={onSubmit}
                fields={fields} />            
        
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} project={project} setProject={setProject} setOpen={setOpen} fetchProductImages={fetchProductImages} />

                {/* table */}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows ? rows.length : 0}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    if (typeof row === 'number') return null;
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox" sx={{ pl: 3 }}>
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal">
                                                {row.main_category}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.middle_category}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.subcategory}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.image_type}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.image_size}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.image_extension}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.source}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="normal">
                                                <img style={{width: 100}} src={row.image_url}/>
                                            </TableCell>
                                            {/* <TableCell component="th" scope="row" padding="normal">
                                                {row.image_url}
                                            </TableCell> */}
                                            <TableCell component="th" scope="row" padding="normal">
                                                {row.created_date}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table data */}
                <TablePagination
                    rowsPerPageOptions={[10, 30, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </MainCard>
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
        </Grid>
    );
};

export default Tables;
