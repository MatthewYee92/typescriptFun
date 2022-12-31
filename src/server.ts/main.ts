import * as express from 'express';

// Create an instance of the express router
const router = express.Router();

// A mock array of rocket launch data
const launchData: Launch[] = [
  {
    id: 1,
    rocketName: 'Falcon 9',
    launchDate: new Date('2022-01-01T12:00:00Z'),
    success: true
  },
  {
    id: 2,
    rocketName: 'Atlas V',
    launchDate: new Date('2022-02-01T12:00:00Z'),
    success: false
  },
  {
    id: 3,
    rocketName: 'Delta IV',
    launchDate: new Date('2022-03-01T12:00:00Z'),
    success: true
  }
];

// A launch model to represent the data for each rocket launch
interface Launch {
  id: number;
  rocketName: string;
  launchDate: Date;
  success: boolean;
}

// GET request to retrieve all launches
router.get('/', (req, res) => {
  res.json(launchData);
});

// GET request to retrieve a single launch by ID
router.get('/:id', (req, res) => {
  const launch = launchData.find(l => l.id === parseInt(req.params.id));
  if (!launch) {
    res.status(404).send('Launch with the specified ID was not found');
  } else {
    res.json(launch);
  }
});

// POST request to add a new launch to the array
router.post('/', (req, res) => {
  const newLaunch: Launch = req.body;
  newLaunch.id = launchData.length + 1;
  launchData.push(newLaunch);
  res.sendStatus(201);
});

// PUT request to update a launch by ID
router.put('/:id', (req, res) => {
  const launch = launchData.find(l => l.id === parseInt(req.params.id));
  if (!launch) {
    res.status(404).send('Launch with the specified ID was not found');
  } else {
    launch.rocketName = req.body.rocketName;
    launch.launchDate = req.body.launchDate;
    launch.success = req.body.success;
    res.sendStatus(200);
  }
});

// DELETE request to delete a launch by ID
router.delete('/:id', (req, res) => {
  const launchIndex = launchData.findIndex(l => l.id === parseInt(req.params.id));
  if (launchIndex === -1) {
    res.status(404).send('Launch with the specified ID was not found');
  } else {
    launchData.splice(launchIndex, 1);
    res.sendStatus(200);
  }
});

export default router;
