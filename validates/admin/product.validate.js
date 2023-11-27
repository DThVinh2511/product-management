module.exports.createPostTitle = (req, res, next) => {
  if(!req.body.title) {
    req.flash('error', 'Vui long nhap thong tin!');
    res.redirect('back');
    return;
  }
  next();
}