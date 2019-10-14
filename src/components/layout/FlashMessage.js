import React from 'react'
import { connect } from "react-redux"

// CDNで記述しているmaterializeCssの読み込み
const { M } = window;

const MESSAGE_COLOR_BY_TYPE = {
  "warning": { textColor: "indigo", backgroundColor: "yellow accent-4" },
  "success": { textColor: "white", backgroundColor: "green lighten-2" }
};

const FlashMessage = (props) => {
  const { message, messageType } = props.flashMessage;
  
  if (!message) return <div></div>

  const color = MESSAGE_COLOR_BY_TYPE[messageType];
  const toastHtml = `<span class="${color.textColor}-text">${message}</span>`
  M.toast({ html: toastHtml, classes: color.backgroundColor });
  // flashMessageを削除する処理

  return <div></div>
}

const mapStateToProps = (state) => {
  return {
    flashMessage: state.flashMessage
  }
}

export default connect(mapStateToProps)(FlashMessage);
