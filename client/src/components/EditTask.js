import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TaskForm from './TaskForm';

import {
  getOrganisations,
  getPriorities,
  getStatuses,
  getVehicles,
  getTask,
  updateTask
} from '../dataaccess/AccessAPI';

const EditTask = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(true);

  const [organisations, setOrganisations] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [initialValues, setInitialValues] = useState({});
  const taskid = props.match.params.id;

  useEffect(() => {
    // A local async function created to be able to use await inside useEffect without issues
    async function loadData() {
      try {
        const orgsData = await getOrganisations();
        setOrganisations(orgsData);

        const priData = await getPriorities();
        setPriorities(priData);

        const statData = await getStatuses();
        setStatuses(statData);

        const vehData = await getVehicles();
        setVehicles(vehData);

        const taskData = await getTask(taskid);
        setInitialValues(taskData);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        history.push('/unexpectederror');
      }
    }
    // Execute the above created function
    loadData();
  }, [taskid, history]);

  const saveData = async (task) => {
    try {
      await updateTask(task);
      history.push('/tasks');
    } catch (error) {
      console.log('error', error);
      history.push('/unexpectederror');
    }
  };

  const taskFormData = {
    initialValues,
    organisations,
    priorities,
    statuses,
    vehicles,
    saveData
  };

  // ToDo: needs improvement
  if (loading) {
    return <div>loading...</div>;
  } else {
    return <TaskForm taskFormData={taskFormData} props={props} />;
  }
};

export default withRouter(EditTask);
