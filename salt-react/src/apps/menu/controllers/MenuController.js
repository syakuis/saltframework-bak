import PropTypes from 'prop-types';

const propTypes = {
  template: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  parentId: PropTypes.string,
};

const defaultProps = {
  parentId: null, // 최상위 id = menu
};

const MenuController = (props) => {
  const menus = props.parentId !== null ? props.menus.reduce((result, menu) => {
    if (menu.parent_id === props.parentId) {
      return result.concat(menu);
    }
    return result;
  }, []) : props.menus;

  return props.template(menus);
};

MenuController.propTypes = propTypes;
MenuController.defaultProps = defaultProps;

export default MenuController;
