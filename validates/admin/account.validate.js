module.exports.createPost = (req, res, next) => {
  if(!req.body.fullName) {
    req.flash('error', 'Vui long nhap thong tin Ho ten!');
    res.redirect('back');
    return;
  }
  if(!req.body.email) {
    req.flash('error', 'Vui long nhap email!');
    res.redirect('back');
    return;
  }
  if(!req.body.password) {
    req.flash('error', 'Vui long nhap mat khau!');
    res.redirect('back');
    return;
  }
  next();
};

module.exports.editPatch = (req, res, next) => {
  if(!req.body.fullName) {
    req.flash('error', 'Vui long nhap thong tin Ho ten!');
    res.redirect('back');
    return;
  }
  if(!req.body.email) {
    req.flash('error', 'Vui long nhap email!');
    res.redirect('back');
    return;
  }
  next();
}