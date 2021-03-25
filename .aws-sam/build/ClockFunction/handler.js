const moment = require('moment')
const pino = require('pino')

exports.clock = async (event)=>{
console.log('Clock Function Running');
const logger = pino({
    base: {
      memorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
      region: process.env.AWS_REGION,
      runtime: process.env.AWS_EXECUTION_ENV,
      version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
    },
    name: process.env.AWS_LAMBDA_FUNCTION_NAME,
    level: process.env.LOG_LEVEL || 'info',
    useLevelLabels: true,
  });
  logger.info({uuid:'foo'},'in clock lambda');
  const child = logger.child({ a: 'property' });
  child.info('hello child!');
  
const message = moment().format();
const response ={
    statusCode:200,
    body: JSON.stringify(message)
}
return response;
}