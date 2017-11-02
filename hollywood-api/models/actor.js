module.exports = db => {
  const type = db.type;

  const Actor = db.createModel("Actor", {
    name: type.string().required(),
    age: type.number().required(),
    birthday: type.string().required(),
    gender: type
      .string()
      .enum(["male", "female", "it"])
      .required()
  });

  return Actor;
};
