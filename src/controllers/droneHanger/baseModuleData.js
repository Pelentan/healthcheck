baseModuleData = {
  1: {
    type: 1,
    name: 'Check HTML Return',
    description: '',
    file: 'scanReturnHtml',
    requestType: "get",
    timeout: 10000,
    statusGood: 200,
    returnType: 'html',
  },
  2: {
    type: 2,
    name: 'Check Json Return',
    description: '',
    file: 'returnJson',
    requestType: "get",
    timeout: 10000,
    statusGood: 200,
    returnType: 'json',
  },
  3: {
    type: 3,
    name: 'Check Server Return',
    description: '',
    file: 'serverConnectCheck',
    requestType: "ssh",
    timeout: 10000,
    statusGood: 200,
    returnType: 'json',
  }, 
  4: {
    type: 4,
    name: 'Server Health Check',
    description: '',
    file: 'serverHealthCheck',
    requestType: "ssh",
    timeout: 10000,
    statusGood: 200,
    returnType: 'json',
  }
}