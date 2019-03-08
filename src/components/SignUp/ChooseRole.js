import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default function ChooseRole(props) {
  return(
    <Grid container spacing={24}>
     <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Choose your role
      </Typography>
     </Grid>
     
    <Grid item xs={12} sm={6}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => props.onPress('freelancer')}
      >
        Freelancer
      </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => props.onPress('employer')}
      >
        Employer
      </Button>
    </Grid>
  </Grid>
  )
}

ChooseRole.propTypes = {
  onPress: PropTypes.func.isRequired
}