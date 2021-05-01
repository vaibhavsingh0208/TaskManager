require('../src/db/mongoose');
const Task = require('../src/model/task');

Task.findByIdAndDelete('608b9f2dc4652198d9c5c0db')
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(count => console.log(count))
  .catch(err => console.log(err));
