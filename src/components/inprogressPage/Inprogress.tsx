import React from 'react'

import { Box, Container, Typography } from "@mui/material"

const Inprogress = () => {

  return (
    <Container maxWidth="sm" className="flex items-center justify-center mt-32">
    <Box textAlign="center" className="p-8 rounded-lg shadow-lg">
      <Typography variant="h4" component="h1" gutterBottom >
        This page is in progress
      </Typography>
      <Typography variant="body1" component="p">
        We are working hard to bring you new content. Stay tuned!
      </Typography>
    </Box>

  </Container>
  )
}


export default Inprogress
