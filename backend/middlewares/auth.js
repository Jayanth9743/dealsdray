import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { _id: decoded.id };
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default authAdmin;