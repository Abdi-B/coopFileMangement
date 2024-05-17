import React from 'react'
import Upload_book from '../pages/Upload_book'
import UploadFile from '../pages/UploadFile'
import { Stack } from '@mui/material'
import CreateAnnouncement from '../pages/CreateAnnouncement'

const Admin = () => {
  return (
    <Stack style={{marginTop: 110, marginBottom: 15, display: 'flex', flexDirection: 'column', width: '100%', height: "100%", backgroundColor: 'whitesmoke'}}>
        <Upload_book style={{width: '100%'}} />
        <UploadFile style={{width: '100%'}}/>
        <CreateAnnouncement  />

    </Stack>
  )}

export default Admin;