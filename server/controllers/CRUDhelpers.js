const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    const data = await query;
    if (!data) {
      return next(
        new AppError(`No document found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).send({
      status: "success",
      data: data,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    if (!data) {
      return next(
        new AppError(`No document found with id ${req.params.id}`, 404)
      );
    }

    res.status(201).json({
      status: "success",
      data: data,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(
        new AppError(`No document found with id ${req.params.id}`, 404)
      );
    }

    res.status(201).json({
      status: "success",
      data,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);

    if (!data) {
      return next(
        new AppError(`No document found with id ${req.params.id}`, 404)
      );
    }

    res.status(201).send({
      status: "success",
      data,
    });
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.deleteMany();
    res.status(201).send({
      status: "success",
      data,
    });
  });
