// const jwt = require("jsonwebtoken");

// const auth = (req,res,next) =>{
//     try{
//         const token = req.headers["authorization"];
//         if(!token){
//             return res.status(401).josn({message:"Access denied"});
//         }
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.user = {id: decoded.userId};
//         next();
//     }catch(err){
//         console.error(err);
//         return res.status(401).json({message:"token is not valid"});
//     }
// }

// module.exports = auth;


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
