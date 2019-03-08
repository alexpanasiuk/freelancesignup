import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions'

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { validateEmail, validatePassword, buildReport } from '../utils/validation';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {

  state = {
    formdata: {
      email: '',
      password: '',
      rememberMe: false
    },
    errors: {

    }
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      formdata: {
        ...this.state.formdata,
        [name]: value
      }
    });
  }

  handleCheckbox = (e) => {
    this.setState({
      formdata: {
        ...this.state.formdata,
        rememberMe: e.target.checked
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state.formdata;
    let errors = {};
    let errorFlag = false;

    const validationEmail = validateEmail(email);
    const validationPassword = validatePassword(password);

    buildReport(errors, 'emailError', validationEmail);
    buildReport(errors, 'passwordError', validationPassword);

    this.setState({
      ...this.state,
      errors
    });

    for( let error in errors) {
      if (errors[error]) {
        errorFlag = true;
        break;
      }
    }

    if (!errorFlag) {
      console.log("log in");
      console.log(this.state.formdata);
      this.props.dispatch(login(this.state.formdata));
    }
  }
  

  render() {
    const { classes } = this.props;
    const { email, password, rememberMe } = this.state.formdata;
    const { emailError, passwordError } = this.state.errors;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField 
                id="email" 
                name="email" 
                value={email}
                label="Email Address"
                onChange={this.handleUserInput}
                error={Boolean(emailError)}
                helperText={emailError}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                name="password" 
                type="password" 
                id="password"
                label="Password"
                value={password}
                onChange={this.handleUserInput}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={this.handleCheckbox}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login));