export default {
  // 防火墙流程开通权限
  /*
  * 1.需求申请页的保存、检查、提交、上传附件操作。
    2.申请人补充信息页的提交、上传附件操作。
    3.实施结果确认页面的验证通过、验证不通过操作。
    * */
  application: 'fara-application',
  /* 业务需求审批 需求审批页的审批通过、不通过操作 */
  businessApproval: 'fara-business-approval',
  /* 合规审批 合规审批页面的审批通过、审批不通过操作 */
  complianceApproval: 'fara-compliance-approval',
  /* 网络需求分析
   * 网络处需求分析页转合规审批、转网络处领导审批、转申请人补充信息、审批不通过操作。
   *  */
  networkAnalysis: 'fara-network-analysis',
  /* 网络处审批 网络处审批也秒的审批通过、审批不通过操作 */
  networkApproval: 'fara-network-approval',
  /* 运维实施
  * 1.ACL检查结果确认页面的所有操作。
    2.变更汇总页面的创建变更汇总、撤回变更汇总操作。
    3.变更作业页面的所有操作。
    4.验证不通过工单页面的处理完成操作。
  *  */
  operation: 'fara-operation',
  /* 运维复核 脚本复核页面的复核通过、不通过操作 */
  operationApproval: 'fara-operation-approval',
  /* 变更审批 变更审批页面的审批通过、不通过操作 */
  changeApproval: 'fara-change-approval',
}
