// utils file is used to wrap a db file like pass your function in my method and i will execute and return you

// try and catch block for async functions

// const asyncHandler=(fn)=>async(req,res,next)=>{
//   try {
//     await fn(req,res,next)
//   } catch (error) {
//     res.status(err.code || 500).jason({
//       success:false,
//       message:err.message})
// }
// }

export { asyncHandler };

// .then .catch
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
