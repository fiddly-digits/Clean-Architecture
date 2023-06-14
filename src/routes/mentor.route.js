const express = require('express');
const router = express.Router();
const {
  create,
  list,
  get,
  remove,
  modify
} = require('../usecases/mentor.usecase.js');
const mentorModel = require('../models/mentor.model.js');

router.get('/', async (req, res) => {
  try {
    const mentors = await list();
    res.json({
      success: true,
      data: mentors
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      error: err.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMentor = await create(req.body);
    let responseParams = {
      success: true,
      data: newMentor
    };
    res.status(201);
    res.json(responseParams);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const selectedMentor = await get(id);
    let responseParams = {
      success: true,
      data: selectedMentor
    };
    if (!selectedMentor) {
      const error = new Error('The ID was non existant');
      error.status = 404;
      throw error;
    } else {
      res.json(responseParams);
    }
  } catch (err) {
    res.status(err.status || 400);
    console.log('Error: ', err);
    res.json({
      success: false,
      error: err.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMentor = await remove(req.params.id);
    let responseParams = {
      success: true,
      message: 'Koder was eliminated successfully'
    };

    if (!deletedMentor) {
      const error = new Error('The ID was non existant');
      error.status = 404;
      throw error;
    }
    res.status(200);
    res.json(responseParams);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.patch('/:id', async (req, res) => {
  const { params, body } = req;
  try {
    const mentorToModify = await get(params.id);
    if (body.generations[0].isActive === true) {
      console.log(body);
      for (generation in mentorToModify.generations) {
        mentorToModify.generations[generation].isActive = false;
        body.generations.unshift(mentorToModify.generations[generation]);
      }
    }
    const modifiedMentor = await modify(params.id, body);

    if (!modifiedMentor) {
      const error = new Error('The ID was non existant');
      error.status = 404;
      throw error;
    }

    res.json({
      success: true,
      message: modifiedMentor
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;

// router.patch('/:id', async (req, res) => {
//     const { params, body } = req;
//     try {
//       const MentorToModify = await get(params.id);
//       const modifiedMentor = {};
//       if (body.generations[0].isActive === true) {
//         MentorToModify.generations.forEach(
//           (generation) => (generation.isActive = false)
//         );
//         MentorToModify.generations.push(body.generations[0]);
//         modifiedMentor = await modify(params.id, MentorToModify);
//       } else {
//         modifiedMentor = await modify(params.id, body);
//       }

//       if (!modifiedMentor) {
//         const error = new Error('The ID was non existant');
//         error.status = 404;
//         throw error;
//       }

//       res.json({
//         success: true,
//         message: modifiedMentor
//       });
//     } catch (err) {
//       res.status(err.status || 500);
//       res.json({
//         success: false,
//         message: err.message
//       });
//     }
//   });
