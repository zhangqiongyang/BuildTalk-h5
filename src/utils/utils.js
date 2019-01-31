export default {
  /**
   * 验证是否有空格
   *
   * @param {}
   *            source
   */
  checkSpace(source) {
    var regex = /\s/g;
    return regex.test(source);
  },


  /**
   * 验证是否全是空格
   *
   * @param {}
   *            source
   * @return {}
   */
  checkAllSpace(source) {
    var regex = /^\s+$/g
    return regex.test(source);
  },


  /**
   * 判断字符串是否为空，若为空则返回true否则返回false
   * @param source
   * @return true或者false
   **/
  isEmpty(source) {
    var str = source.replace(/(^\s*)|(\s*$)/g, "");
    if (str == "" || str.toLowerCase() == "null" || str.length <= 0) {
      return true;
    } else {
      return false;
    }
  },


  //判空函数
  //判空
  strIsEmpty(str) {
    if (str == "" || str == null || typeof(str) == "undefined") {
      return true;
    } else {
      return false;
    }

  },

  /**
   * 判断是否为空
   * @param val
   * @returns
   */
  isNull(val) {
    if (val == undefined || val == null || val == "" || val == ''
      || val == "undefined" || val == "null" || val == "NULL") {
      return true;
    }
    return false;
  }


}
