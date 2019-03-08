import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';

import { validateName, validateEmail, validatePassword, buildReport, comparePasswords } from '../../utils/validation';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
];

const styles = theme => ({
  attachment: {
    marginTop: theme.spacing.unit
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  errorMsg: {
    color: '#f44336'
  }
});


class FreelancerRegisterForm extends Component {

  state = {
    formdata: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      skills: [],
      files: null
    },
    skillsNotSelected: false, 
    errors: {

    }
  };

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      formdata: {
        ...this.state.formdata,
        [name]: value
      }
    });
  }

  handleSelectChange = event => {
    const selectValue = event.target.value;
    this.setState({
      formdata: {
        ...this.state.formdata,
        skills: selectValue,
      },
      skillsNotSelected: !Boolean(selectValue.length)
    });
  };

  handleFileChange = event => {
    this.setState({
      formdata: {
        ...this.state.formdata,
        files: event.target.files 
      }
    })
  }

  handleSignUpPress = (e) => {
    const { firstName, lastName, email, password, confirmPassword, skills } = this.state.formdata;
    let errors = {};
    let errorFlag = false;

    const validationEmail = validateEmail(email);
    const validationFirstName = validateName(firstName);
    const validationLastName = validateName(lastName);
    const validationPassword = validatePassword(password);
    const validationConfirmPassword = comparePasswords(password, confirmPassword);

    buildReport(errors, 'emailError', validationEmail);
    buildReport(errors, 'firstNameError', validationFirstName);
    buildReport(errors, 'lastNameError', validationLastName);
    buildReport(errors, 'passwordError', validationPassword);
    buildReport(errors, 'confirmPasswordError', validationConfirmPassword);

    this.setState({
      ...this.state,
      errors,
      skillsNotSelected: !skills.length
    });

    if (skills.length === 0) {
      errorFlag = true;
    }

    for( let error in errors) {
      if (errors[error]) {
        errorFlag = true;
        break;
      }
    }

    if (!errorFlag) {
      this.props.onSubmit(this.state.formdata);
    }
  }

  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, password, confirmPassword } = this.state.formdata;
    const { firstNameError, lastNameError, emailError, passwordError, confirmPasswordError } = this.state.errors;
    const skillsNotSelected = this.state.skillsNotSelected;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Register info
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={firstName}
              onChange={this.handleUserInput}
              error={Boolean(firstNameError)}
              helperText={firstNameError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              value={lastName}
              onChange={this.handleUserInput}
              error={Boolean(lastNameError)}
              helperText={lastNameError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={this.handleUserInput}
              error={Boolean(emailError)}
              helperText={emailError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={this.handleUserInput}
              error={Boolean(passwordError)}
              helperText={passwordError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="confirm-password"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={this.handleUserInput}
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="select-multiple">Your skills *</InputLabel>
            <Select
              multiple
              required
              value={this.state.formdata.skills}
              onChange={this.handleSelectChange}
              input={<Input id="select-multiple" />}
              MenuProps={MenuProps}
              fullWidth
            >
              {skills.map(skill => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
            {skillsNotSelected && <FormHelperText className={classes.errorMsg}>this field is required</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6} className={classes.attachment}>
            <InputLabel htmlFor="files">Attachment</InputLabel>
            <input
              id="files"
              multiple 
              type="file"
              className={classes.attachment}
              onChange={this.handleFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              {this.props.BackBtn}
              <Button className={classes.button} onClick={this.handleSignUpPress} color="primary" variant="contained">
                Sign up
              </Button>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FreelancerRegisterForm);