import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

import { buildReport, comparePasswords } from '../../utils/validation';

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

const styles = theme => ({
  attachment: {
    display: 'block',
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


class form extends Component {

  state = {
    formdata: this.props.fields.reduce( (accum, field) => {
      return { 
        ...accum,
        [field.name]: field.type === 'select' ? [] : '',
      }
    }, {}),
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
      skillsNotSelected: !selectValue.length
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
    const { password, confirmPassword, skills } = this.state.formdata;
    let errors = {};
    let errorFlag = false;

    this.props.fields.forEach(field => {
      if (field.validator) {
        buildReport(errors, field, this.state.formdata[field.name]);
      }
    });
    let comparePasswordsResult = comparePasswords(password, confirmPassword);
    if (comparePasswordsResult.isValid) {
      errors.confirmPasswordError = false;
    } else {
      errors.confirmPasswordError = comparePasswordsResult.error;
    }

    if (skills) {
      this.setState({
        ...this.state,
        errors,
        skillsNotSelected: !skills.length
      });
      if (skills.length === 0) {
        errorFlag = true;
      }
    } else {
      this.setState({
        ...this.state,
        errors,
      });
    }

    for(let error in errors) {
      if (errors[error]) {
        errorFlag = true;
        break;
      }
    } 

    if (!errorFlag) {
      this.props.onSubmit(this.state.formdata);
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

  renderSelect = (field) => (
    <React.Fragment>
      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
      <Select
        multiple={field.multiple}
        value={this.state.formdata.skills}
        onChange={this.handleSelectChange}
        input={<Input id={field.id} />}
        MenuProps={MenuProps}
        fullWidth
      >
        {field.list.map(skill => (
          <MenuItem key={skill} value={skill}>
            {skill}
          </MenuItem>
        ))}
      </Select>
      {this.state.skillsNotSelected && <FormHelperText className={this.props.classes.errorMsg}>this field is required</FormHelperText>}
    </React.Fragment>
  )

  renderFile = (field) => (
    <React.Fragment>
      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
      <input
        id={field.id}
        multiple={field.multiple}
        type={field.type}
        className={this.props.classes.attachment}
        onChange={this.handleFileChange}
      />
    </React.Fragment>
  )

  chooseInputType = (field) => {
    switch(field.type) {
      case ('select'): 
        return this.renderSelect(field);
      case ('file'):
        return this.renderFile(field);
      default: 
        return this.renderInput(field);
    }
  }

  renderForm = () => this.props.fields.map((field, i) => (
    <Grid item {...field.grid} key={i}>
      {this.chooseInputType(field)}
    </Grid>
  ));

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Register info
        </Typography>
        <Grid container spacing={24}>
          {this.renderForm()}
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

form.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired
};

export default withStyles(styles)(form);