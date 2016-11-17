const db = require('./db');
const models = require('./models');

const exptSeed = () => models.Experiment.create({
    title: "Myostatin inhibition in combination with SMN upregulation"
});

const arms = [
    {title: 'whatever1', goal: 5, genotype: 'SMA', treatment: 'drug', experimentId: 1},
    {title: 'whatever2', goal: 5, genotype: 'WT', treatment: 'drug', experimentId: 1},
    {title: 'whatever3', goal: 5, genotype: 'SMA', treatment: 'vehicle', experimentId: 1},
    {title: 'whatever4', goal: 5, genotype: 'WT', treatment: 'vehicle', experimentId: 1}
];

const mice = [
    {gender: 'male', genotype: 'SMA',  armId: 1},
    {gender: 'female', genotype: 'SMA', armId: 1},
    {gender: 'male', genotype: 'WT', armId: 2},
    {gender: 'female', genotype: 'WT', armId: 2}
];


const seedMice = () => db.Promise.map(mice, mouse => models.Mouse.create(mouse));
const seedArms = () => db.Promise.map(arms, arm => models.Arm.create(arm));

db.sync({force:true})
  .then(exptSeed)
  .then(seedArms)
  .then(seedMice)
  .then(res => {
    console.log(`Seeded items`)
  })
  .catch(error => console.error(error))
  .finally(() => db.close())


