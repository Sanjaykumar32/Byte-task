import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const drawerWidth = 200;

export default function PermanentDrawerLeft() {
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [page , setPage] = useState(1)
  
  useEffect(() => {
    async function fatchData() {
      const res = await axios.get(`https://reqres.in/api/users?page=${[page]}`)
      setList(res?.data?.data);
      console.log(res ,'api res');
    }
    fatchData();
  }, [page])


  const handleDelete = async (id) => {
    const res = await axios.delete(`https://reqres.in/api/users/${{id}}`)
    console.log(res, 'res delete');
  }
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/SignIn')
  }


  React.useEffect(() => {
    if (!token) {
      navigate('/SignIn')
    }
  }, [])

  const handlePage = (el)=>{
    setPage(el.target.textContent);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Test Project
          </Typography>
          <Typography variant="h6" noWrap component="div" className='log' onClick={logout}>
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Users'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>


      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

        <div className='user'>
          Users
        </div>

        <table>

          <tr>
            <th>Avtar</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>

          {list?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={item.avatar} className='img' alt="" />
                </td>
                <td>{item.id}</td>
                <td>{item?.first_name}</td>
                <td>{item?.last_name}</td>
                <td>{item?.email}</td>
                <td>
                  <td className='btn'>Edit</td>
                  <td className='btnd' onClick={() => handleDelete(item?.id)}>Delete</td>
                </td>
              </tr>)
          })}

        </table>
        <div className='page'>
          <Stack spacing={2}>
            <Pagination count={2}  onClick={(el)=> handlePage(el)}  variant="outlined"/>
          </Stack>
        </div>


      </Box>
    </Box>


  );
}
