"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _reactNativeResponsiveScreen = require("react-native-responsive-screen");

var _Color = require("../../../Constants/Color");

var _Theme = require("../../../Constants/Theme");

var styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _Theme.theme.action_Buttons_BG,
    borderRadius: 3,
    paddingVertical: 10
  },
  submitBtnContainer: {
    width: '100%'
  },
  bottomBtn: {
    backgroundColor: _Color.color._Action_Buttons,
    borderRadius: 3,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignContent: 'space-between',
    position: 'absolute',
    bottom: (0, _reactNativeResponsiveScreen.widthPercentageToDP)(2),
    width: '100%' // left:15,
    // width:'92.3%',
    // marginLeft:15,
    // marginRight:15,

  },
  btnText: {
    color: _Theme.theme.action_Buttons_Text_Color,
    fontSize: (0, _reactNativeResponsiveScreen.widthPercentageToDP)(5),
    textAlign: 'center',
    fontWeight: '700'
  }
});

var _default = styles;
exports["default"] = _default;