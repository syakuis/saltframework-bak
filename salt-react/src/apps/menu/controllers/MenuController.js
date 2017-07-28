import PropTypes from 'prop-types';

const propTypes = {
  template: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  parentIdx: PropTypes.string,
};

const defaultProps = {
  parentIdx: null, // 최상위 id = menu
};

const MenuController = (props) => {
  const menus = props.parentIdx !== null ? props.menus.reduce((result, menu) => {
    if (menu.parentIdx === props.parentIdx) {
      return result.concat(menu);
    }
    return result;
  }, []) : props.menus;

  return props.template(menus);
};

MenuController.propTypes = propTypes;
MenuController.defaultProps = defaultProps;

export default MenuController;
