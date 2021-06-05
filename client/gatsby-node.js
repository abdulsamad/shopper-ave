exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/admin/)) {
    page.matchPath = "/admin/*";
    actions.createPage(page);
  }
};
