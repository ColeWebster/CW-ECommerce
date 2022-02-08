const router = require('express').Router();
const { tag, product, productTag } = require('../../models');

//Find all tags
router.get('/', async (req, res) => {
  
  try {
    const tagData = await Tag.findAll(req.params.id, {
      // JOIN with locations, using the Trip through table
      include: [{ model: product, through: productTag, as: 'tagged_products' }]
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Find tag by an ID
router.get('/:id', (req, res) => {

  try {
    const tagData = await tag.findByPk(req.params.id, {
      include: [{ model: product, through: productTag, as: 'tagged_products' }]
    });

    if (!locationData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new tag      
router.post('/', async (req, res) => {
  try {
    let tagData = await Tag.create(req.body);

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Update tag by ID
router.put('/:id', async (req, res) => {
   try {
    let tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;