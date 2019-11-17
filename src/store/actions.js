export default{
  // 提交 mutation，由 mutation 操作 state
  resetToken(context){
    context.commit('resetToken', token)
  }
}