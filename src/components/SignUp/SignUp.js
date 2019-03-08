import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChooseRole from './ChooseRole';

import { freelancerFields, employerFields } from '../../config';
import FreelancerRegisterForm from './form';
import EmployerRegisterForm from './form';

import { signUp } from '../../actions';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loadingWrapper: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    background: 'rgba(0,0,0,.3)',
    zIndex: '9999'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Your role', 'Register info'];

const BackBtn = (that) => (
  <Button onClick={that.handleBack} color="primary" className={that.props.classes.button}>
    Back
  </Button>
);

function getStepContent(step, role, that) {
  switch (step) {
    case 0:
      return <ChooseRole
                onPress={that.handleNext}
             />;
    case 1:
      return role === 'freelancer'
        ? <FreelancerRegisterForm
          fields={freelancerFields} 
          onSubmit={that.handleSignUp}
          BackBtn={BackBtn(that)}
        />
        : <EmployerRegisterForm
          fields={employerFields} 
          onSubmit={that.handleSignUp}
          BackBtn={BackBtn(that)}
        />;
    default:
      return <ChooseRole
          onPress={that.handleNext}
      />;
  }
}

class SignUp extends React.Component {
  state = {
    activeStep: 0,
    userRole: null,
    loading: false
  };


  handleNext = (role) => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      userRole: role
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      userRole: null
    });
  };

  handleSignUp = (options) => {
    console.log('sign up');
    console.log(options);
    this.setState({loading: true});
    this.props.dispatch(signUp(options, () => {
      this.props.history.push('/');
    }));
  }

  render() {
    const { classes } = this.props;
    const { activeStep, userRole, loading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        {loading &&
          <div className={classes.loadingWrapper}>
            <div className={classes.loading}>
              <CircularProgress className={classes.progress} size={60}/>
            </div>
          </div>
        }
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Sign up
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>    
            <React.Fragment>
              {getStepContent(activeStep, userRole, this)}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(SignUp));