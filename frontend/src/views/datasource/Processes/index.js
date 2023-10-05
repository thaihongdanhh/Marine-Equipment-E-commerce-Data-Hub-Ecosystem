// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Grid, List,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    ListItemButton, Button, Input, InputLabel, Divider, Select, MenuItem, FormControl,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Stack, TextField, Typography, CircularProgress
} from '@mui/material';
import { useDispatch } from "react-redux"
import React from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
// project imports
import Avatar from 'ui-component/extended/Avatar';

// assets
import ImageIcon from '@mui/icons-material/ImageTwoTone';
import WorkIcon from '@mui/icons-material/WorkOffTwoTone';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ViewCompactTwoToneIcon from '@mui/icons-material/ViewCompactTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import AWS from 'aws-sdk';
// ==============================|| ANALYTICS DASHBOARD ||============================== //

const API_URL = 'https://httpbin.org/post'
const API_METHOD = 'POST'
const STATUS_IDLE = 0
const STATUS_UPLOADING = 1

const Overview = () => {
    const theme = useTheme();

    const S3_BUCKET = "kmou-dp"
    const REGION = "ap-southeast-1"
    const dispatch = useDispatch()

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        s3Url: 'http://kmou-dp.s3-website-ap-southeast-1.amazonaws.com',
        bucketName: S3_BUCKET,
        region: REGION
    });

    const s3 = new AWS.S3()



    const [files, setFiles] = React.useState([])
    const [status, setStatus] = React.useState(STATUS_IDLE)
    const [project, setProject] = React.useState('')
    
    const [open, setOpen] = React.useState(false)
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openImage, setOpenImage] = React.useState(false)

    const [FolderName, setFolderName] = React.useState('')
    const [subObjects, setSubObjects] = React.useState([])
    const [Folders, setFolders] = React.useState([])
    const [Images, setImages] = React.useState([])
    const [Image, setImage] = React.useState([])
    
    const [isLoading, setLoading] = React.useState(true)
    const [isRename, setRename] = React.useState(false)
    const [isMatchDelete, setMatchDelete] = React.useState(false)
    const [isOpenFolder, setOpenFolder] = React.useState(false)

    const prevFolders = React.useRef([])
    const prevLoading = React.useRef(null)

    const uploadFiles = async (data) => {
        setStatus(STATUS_UPLOADING);

        // console.log(URL.createObjectURL(chosenFile[0]))
        
        await new Promise (async (resolve) => {
            await data.forEach(async (file, index, array) => {
                const params = {
                    Bucket: "kmou-dp",
                    Key: "Marine-Parts/" + project + "/" + FolderName + file['name'],
                    Body: file
                }
    
                s3.upload(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        console.log("Success");           // successful response    
                        if (String(index.split('-')[1]) === String(files.length -1)) {
                            resolve('Uploaded File !')
                        }
                    }
                })                                                
            })            
        }).then((result) => {
            console.log(result)
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Upload - Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
    
            setFiles([])
            setStatus(STATUS_IDLE)        
        })
        

               


        // fetch(API_URL, {
        //     method: API_METHOD,
        //     body: data,
        // })
        // .then((res) => res.json())
        // .then((data) => console.log(data))
        // .catch((err) => console.error(err))
        // .finally(() => setStatus(STATUS_IDLE))


    }

    const packFiles = async (files) => {
        const data = new FormData();

        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        })        
        return data
    }

    const handleUploadClick = async () => {
        // console.log(files.length)
        if (files.length) {
            const data = await packFiles(files)
            uploadFiles(data)
        }
    }

    const renderFileList = () => (<ol>
        {[...files].map((f, i) => (
            <li key={i}>{f.name}</li>
        ))}
    </ol>)

    const renderButtonStatus = () => (
        (status === STATUS_IDLE) ?
            'Send to server' :
            <Grid item>
                <CircularProgress aria-label="progress" />
            </Grid>
    )


    const handleClickOpen = () => {
        setOpen(true);
    };    

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenUpdate = (data) => {
        setOpenUpdate(true);
        setFolderName(data)
        // console.log(data)
    };

    const handleClickOpenDelete = (data) => {
        setOpenDelete(true);
        // setFolderName(data)
        // console.log(data)
    };

    const handleClickOpenFolder = () => {
        setOpenFolder(true)
        setOpenUpdate(false)
        fetchImages()        

    }

    const handleUpdateClose = () => {
        setOpenUpdate(false);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false)
        setOpenUpdate(false)
    };

    const handleUpdateSubmit = () => {
        console.log(FolderName)
    };

    const handleDeleteFolder = () => {
        const params = {
            Bucket: "kmou-dp",
            Key: "Marine-Parts/" + project + "/" + FolderName
        }

        s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                // console.log(Objects)
                console.log("Success");           // successful response 
                fetchFolders(project)
            }
        });

    }

    const handleAddFolder = () => {
        const params = {
            Bucket: "kmou-dp",
            Key: "Marine-Parts/" + project + "/" + FolderName + "/"
        }

        let err = 0
        subObjects.Contents.map((data, index) => {
            // console.log(data.Key.split("/")[2] === FolderName)
            if (data.Key.split("/")[2] === FolderName) {
                err = 1
            }
        })

        if (err === 0) {
            s3.putObject(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    // console.log(Objects)
                    console.log("Success");           // successful response 
                    fetchFolders(project)
                }
            });
        } else {
            console.log('Exists')
        }
    }

    const fetchFolders = (project) => {
        const params = {
            Bucket: 'kmou-dp',
            Prefix: "Marine-Parts/" + project + "/",
            Delimiter: '/'
        };

        // setLoading(true);

        s3.listObjectsV2(params, async (err, data) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(data)
                setSubObjects(data)
                // setFolders([])                
                let Folders = []                
                data.CommonPrefixes.map((data, index) => {                    
                    if (data.Prefix.split("Marine-Parts/" + project + "/")[1] !== '' ) {
                        Folders.push(data.Prefix.split("Marine-Parts/" + project + "/")[1])
                    }
                })
                setFolders(Folders)
                setLoading(false)                
            }
        })

    }

    const fetchImages = () => {
        const params = {
            Bucket: 'kmou-dp',
            Prefix: "Marine-Parts/" + project + "/" + FolderName,
            Delimiter: ''
        };

        // setLoading(true);

        s3.listObjectsV2(params, async (err, data) => {
            if (err) {
                console.log(err)
            } else {                                              
                await new Promise((resolve) => {
                    let Images = []
                    data.Contents.map( async (data, index) => {
                        if (data.Key.split("Marine-Parts/" + project + "/" + FolderName)[1] !== ''){
                            const params = {
                                Bucket: 'kmou-dp',
                                Key: data.Key
                            }
        
                            await s3.getSignedUrlPromise('getObject', params, (err, data) => {
                                if(err){
                                    console.log(err)
                                } else {                            
                                   Images.push(data)
                                }
                            })               
                        }                         
                })

                    resolve(Images)
                }).then(
                    Images => {
                        setImages(Images)
                        console.log(Images)
                    }
                )      
                // setLoading(false)                
            }
        })

    }

    React.useEffect(() => {
        fetchFolders(project)
    }, [])

    React.useEffect(() => {
        prevFolders.current = Folders
        prevLoading.current = isLoading
    }, [Folders, isLoading])



    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>
                <MainCard title="S3 Management">
                    <Grid container spacing={2}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="project-select">Data Source</InputLabel>
                            <Select
                                id="project"
                                name="project"
                                value={project}
                                onChange={async (e) => {
                                    setProject(e.target.value);                                    
                                    fetchFolders(e.target.value);
                                }}
                                label="Project"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'amazon'}>Amazon</MenuItem>
                                <MenuItem value={'ebay'}>Ebay</MenuItem>
                                <MenuItem value={'marinesuperstore'}>Marine Super Store</MenuItem>
                                <MenuItem value={'svb24'}>Svb 24</MenuItem>
                                <MenuItem value={'westmarine'}>West Marine</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>                                             
                        <Grid item xs={12}>
                            {!isOpenFolder && (
                            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                Add Folder
                            </Button>
                            
                            )}
                            {isOpenFolder && (
                                <Grid container item xs={12}>
                                    <Grid item xs={12} lg={1}>
                                        <Button variant="contained" color="info" onClick={() => { setOpenFolder(false); setImages([]) }}>
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <InputLabel>
                                            <Button variant='text'>{FolderName}</Button>
                                        </InputLabel>
                                    </Grid>
                                </Grid>
                            )}                            
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            {(!isLoading && !isOpenFolder) && (
                                <List component="nav" aria-label="main mailbox folders">
                                    {Folders.map((data, index) => {
                                        return <ListItemButton onClick={() => {handleClickOpenUpdate(data)}} key={index}>
                                            <ListItemAvatar>
                                                <Avatar size="xs" color="primary" outline>
                                                    <ImageIcon sx={{ fontSize: '1.1rem' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={data} secondary="Jan 9, 2014" />
                                        </ListItemButton>
                                    })}
                                </List>
                            )}
                            {(!isLoading && isOpenFolder) && (
                                <>
                                <Grid item xs={12} lg={12}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setFiles(e.target.files)}
                                        // id="raised-button-file"
                                    />
                                    {renderFileList()}
                                    <InputLabel htmlFor="raised-button-file">
                                        <Button id="raised-button-file" onClick={handleUploadClick} disabled={status === STATUS_UPLOADING} variant="raised" component="span" >
                                            {renderButtonStatus()}
                                        </Button>
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    {Images.map((data, index) => {
                                        return  <Button variant='text'>
                                        <LazyLoadImage
                                            key={data.split('/')[(data.split('/')).length - 1].split('?')[0]}
                                            alt={index}
                                            effect="blur"
                                            src={data} 
                                            style={{width: 100, height: 100, padding: 15}}
                                            onClick={() => {
                                                setOpenImage(true);
                                                setImage(data)
                                            }}
                                            />
                                            </Button>
                                    })}                                        
                                </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </MainCard>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {open && (
                        <>
                            <DialogTitle id="form-dialog-title">Add Folder</DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    <DialogContentText>
                                        <Typography variant="body2" component="span">
                                            Folder Name
                                        </Typography>
                                    </DialogContentText>
                                    <TextField onChange={(e) => { setFolderName(e.target.value) }}
                                        autoFocus size="small" id="fileName" name="fileName" label="Folder Name"
                                        fullWidth />
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>
                                <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button variant="contained" size="small" onClick={handleAddFolder}>
                                    Add
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
                <Dialog open={openUpdate} onClose={handleUpdateClose} aria-labelledby="form-dialog-title">
                    {openUpdate && (
                        <>
                            <DialogTitle id="form-dialog-title">Update Folder</DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    <DialogContentText>
                                        <Typography variant="body2" component="span">
                                            Folder Name
                                        </Typography>
                                    </DialogContentText>
                                    <TextField 
                                        disabled={!isRename}
                                        value={FolderName}
                                        onChange={(e) => { setFolderName(e.target.value) }}
                                        autoFocus size="small" id="fileName" name="fileName" label="Folder Name"
                                        fullWidth />
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>                                
                                <Button sx={{ color: theme.palette.primary.light}} variant="contained" size="small" onClick={handleClickOpenFolder}>
                                    Open Folder
                                </Button>                                
                                {!isRename && (
                                 <Button sx={{ color: theme.palette.info.dark}}  variant="outlined" size="small" onClick={() => {setRename(true)}}>
                                    Rename Folder
                                 </Button>
                                )}
                                {isRename && ( 
                                 <Button variant="contained" size="small" onClick={handleUpdateSubmit}>
                                    Submit
                                </Button>
                                )}       
                                <Button sx={{ color: theme.palette.error.dark}} variant="outlined" size="small" onClick={handleClickOpenDelete}>
                                    Delete
                                </Button>                   
                                <Button sx={{ color: theme.palette.secondary.dark }} onClick={handleUpdateClose} color="secondary">
                                    Cancel
                                </Button>                                      
                            </DialogActions>
                        </>
                    )}
                </Dialog>
                <Dialog open={openDelete} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
                    {openDelete && (
                        <>
                            <DialogTitle id="form-dialog-title">Delete Folder</DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    <DialogContentText>
                                        <Typography variant="body2" component="span">
                                            Type Folder Name To Delete
                                        </Typography>
                                    </DialogContentText>
                                    <TextField onChange={(e) => { 
                                        if (e.target.value === FolderName){
                                            setMatchDelete(true)
                                        }
                                        }}
                                        autoFocus size="small" id="fileName" name="fileName" label="Folder Name"
                                        fullWidth />
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>
                                <Button sx={{ color: theme.palette.error.dark }} onClick={handleDeleteClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button disabled={!isMatchDelete} variant="contained" size="small" onClick={handleDeleteFolder}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
                <Dialog open={openImage} onClose={() => {setOpenImage(false)}} aria-labelledby="form-dialog-title">
                    {openImage && (
                        <>
                            <DialogTitle id="form-dialog-title">Image</DialogTitle>
                            <DialogContent>
                                <Stack spacing={3}>
                                    <DialogContentText>
                                        <Typography variant="body2" component="span">
                                            <Button variant='text'>
                                                {Image.split('/')[(Image.split('/')).length - 1].split('?')[0]}
                                            </Button>
                                        </Typography>
                                    </DialogContentText>
                                    <img alt={Image} src={Image}></img>
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ pr: 2.5 }}>
                                <Button sx={{ color: theme.palette.error.dark }} onClick={() => {setOpenImage(false)}} color="secondary">
                                    Cancel
                                </Button>                               
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default Overview;
