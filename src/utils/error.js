import router from '../router'

export function error(code,message) {
  const strCode = code.toString()
  switch (strCode) {
    case "1001":
      this.$message({
        showClose: true,
        message: '未找到令牌,请重新登陆',
        type: 'error'
      });
      router.push("/login")
      break;
    case "1002":
      this.$message({
        showClose: true,
        message: '令牌已过期,请重新登陆',
        type: 'error'
      });
      router.push("/login")
      break;
    case "1003":
      this.$message({
        showClose: true,
        message: '模型不可用',
        type: 'error'
      });
      break;
    case "1004":
      this.$message({
        showClose: true,
        message: '缺少必需的业务参数值',
        type: 'error'
      });
      break;
    case "1005":
      this.$message({
        showClose: true,
        message: '数据库无效',
        type: 'error'
      });
      break;
    case "1006":
      this.$message({
        showClose: true,
        message: '加密参数错误',
        type: 'error'
      });
      break;
    case "1007":
      this.$message({
        showClose: true,
        message: message,
        type: 'error'
      });
      break;
  }
}
