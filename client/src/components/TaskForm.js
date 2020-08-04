import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import lightBlue from '@material-ui/core/colors/lightBlue';

const validationSchema = Yup.object().shape({
  OrganisationId: Yup.string().required('Please select an Organisation.'),

  priority: Yup.string().required('Please select Priority'),
  tasksummary: Yup.string().required('Please enter Task summary')
});

const ErrorWrapper = styled.div`
  color: red;
`;

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: 650
  },

  submitButton: {
    backgroundColor: lightBlue[700],
    color: theme.palette.common.white,
    minWidth: 170
  }
}));

const TaskForm = ({ taskFormData, props }) => {
  const classes = useStyles();
  const {
    initialValues,
    organisations,
    priorities,
    statuses,
    vehicles,
    saveData
  } = taskFormData;

  const _onSubmit = (values, actions) => {
    saveData(values);
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={_onSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={2}></Grid>
              <Grid item container xs={8}>
                <Grid container>
                  <Grid item xs={10}>
                    <div className="pageHeader">
                      {values.id ? 'Edit' : 'Add'} Task
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <Field name="tasksummary">
                      {({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          margin="normal"
                          label="Task summay"
                          size="small"
                          fullWidth
                        />
                      )}
                    </Field>
                    {errors.tasksummary && touched.tasksummary ? (
                      <ErrorWrapper>{errors.tasksummary}</ErrorWrapper>
                    ) : null}
                  </Grid>

                  <Grid item xs={10}>
                    <Field name="taskdescription">
                      {({ field }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          margin="normal"
                          label="Task description"
                          multiline
                          rows="3"
                          rowsMax="6"
                          size="small"
                          fullWidth
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={10}>
                    <Field name="OrganisationId">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="OrganisationId"
                          select
                          label="Organisation"
                          value={values.OrganisationId}
                          margin="normal"
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {organisations.map((organisation) => (
                            <MenuItem
                              key={organisation.id}
                              value={organisation.id}
                            >
                              {organisation.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                    {errors.OrganisationId && touched.OrganisationId ? (
                      <ErrorWrapper>{errors.OrganisationId}</ErrorWrapper>
                    ) : null}
                  </Grid>

                  <Grid item xs={10}>
                    <Field name="priority">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="priority"
                          select
                          label="Priority"
                          value={values.priority}
                          margin="normal"
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {priorities.map((priority) => (
                            <MenuItem key={priority.id} value={priority.id}>
                              {priority.priority}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                    {errors.priority && touched.priority ? (
                      <ErrorWrapper>{errors.priority}</ErrorWrapper>
                    ) : null}
                  </Grid>

                  <Grid item xs={10}>
                    <Field name="assignedto">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="assignedto"
                          select
                          label="Assigned To"
                          value={values.assignedto}
                          margin="normal"
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {vehicles.map((vehicle) => (
                            <MenuItem key={vehicle.id} value={vehicle.vehicle}>
                              {vehicle.vehicle}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>

                  {values.id && (
                    <Grid item xs={10}>
                      <Field name="taskStatus">
                        {({ field }) => (
                          <TextField
                            {...field}
                            id="taskStatus"
                            select
                            label="Status"
                            value={values.taskStatus}
                            margin="normal"
                            variant="outlined"
                            size="small"
                            fullWidth
                          >
                            {statuses.map((status) => (
                              <MenuItem key={status.id} value={status.id}>
                                {status.status}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      </Field>
                    </Grid>
                  )}

                  <Grid item xs={10}>
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submitButton}
                      size="medium"
                    >
                      {values.id ? 'Save' : 'Add'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(TaskForm);
