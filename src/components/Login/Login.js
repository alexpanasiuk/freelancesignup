import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions'

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { buildReport } from '../../utils/validation';
import { loginFields } from '../../config';

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
  appBar: {
    position: 'relative',
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
    formdata: loginFields.reduce( (accum, field) => {
      return { 
        ...accum,
        [field.name]: field.type === 'select' ? [] : '',
      }
    }, {rememberMe: false}),
    errors: {},
    loading: false
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      formdata: {
        ...this.state.formdata,
        [name]: value,
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
    let errors = {};
    let errorFlag = false;

    loginFields.forEach(field => {
      if (field.validator) {
        buildReport(errors, field, this.state.formdata[field.name]);
      }
    });

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
      this.setState({loading: true});
      this.props.dispatch(login(this.state.formdata, () => this.setState({loading: false})));
    }
  }

  renderInput = (field) => {
    const errorName = field.name + 'Error';
    
    return <TextField
        required
        name={field.name}
        label={field.label}
        type={field.type || 'text'}
        value={this.state.formdata[field.name]}
        onChange={this.handleUserInput}
        error={!!this.state.errors[errorName]}
        helperText={this.state.errors[errorName]}
        fullWidth
      />
  }

  renderForm = () => loginFields.map((field, i) => (
    <FormControl margin="normal" required fullWidth key={i}>
      {this.renderInput(field)}
    </FormControl>
  ));

  

  render() {
    const { classes } = this.props;
    const { rememberMe } = this.state.formdata;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Login
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <CssBaseline />
          {loading &&
            <div className={classes.loadingWrapper}>
              <div className={classes.loading}>
                <CircularProgress className={classes.progress} size={60}/>
              </div>
            </div>
          }
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              {this.renderForm()}
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
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login));