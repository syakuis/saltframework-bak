import PropTypes from 'prop-types';

const propTypesPortlet = {
  // 컨텍스트 메뉴 활성화 여부
  isShowContextMenu: PropTypes.bool.isRequired,
  // 해당 포틀릿 정보
  portlet: PropTypes.object.isRequired,
  // 해당 포틀릿 idx (고유번호)
  idx: PropTypes.string.isRequired,
  // 변경된 포틀릿 정보 업데이트
  setPortletOptions: PropTypes.func.isRequired,
  copyPortlet: PropTypes.func.isRequired,
  deletePortlet: PropTypes.func.isRequired,
};

export default propTypesPortlet;
