const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 'P2002') {
    const field = err.meta?.target ? err.meta.target.join(', ') : 'field';
    return res.status(409).json({
      error: 'Conflict Error',
      message: `Запись с таким значением (${field}) уже существует.`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Запрашиваемая запись не найдена.',
    });
  }

  if (err.code === 'P2003') {
    return res.status(400).json({
      error: 'Foreign Key Constraint',
      message: 'Указанная связанная запись (например, authorId) не существует.',
    });
  }

  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Что-то пошло не так на сервере.',
  });
};

module.exports = errorHandler;
