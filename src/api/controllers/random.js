import models from '../../database/models';

const random = async (req, res) => {
  const stations = {};
  const st = await models.Random.findAll();
  st.forEach((e) => {
    stations[e.name] = e.clerk;
  });
  const emptyChoices = req.body.choices.filter(element => !stations[element]);
  if (!emptyChoices[0]) {
    return res.status(400).json({
      success: false,
      message: 'All your choices have been filled'
    });
  }
  const myStation = await models.Random.update({ clerk: req.body.name }, {
    where: {
      name: emptyChoices[0]
    }
  });
  if (myStation) {
    const newStation = await models.Random.find({ where: { name: emptyChoices[0] } });
    return res.status(200).json({
      success: true,
      newStation
    });
  }
  res.status(408).json({
    success: false,
    message: 'an error occured'
  });
};

export default { random };
