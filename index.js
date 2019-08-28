export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    const consoleLogCalls = root.find(j.CallExpression, {
        callee: {
            object: {
                name: 'console'
            },
            property: {
                name: 'log'
            }
        }
    });
  
    consoleLogCalls.forEach(p => {
          // console.log(p.parentPath.parentPath.parentPath.parentPath.value.type === 'CatchClause')
      if (p.parentPath.parentPath.parentPath.parentPath.value.type !== 'CatchClause') {
       j(p.parentPath).remove();
      }
      // p.parentPath.parentPath.parentPath.parentPath.value.type === 'CatchClause'
      
    });
    return root.toSource();
};
