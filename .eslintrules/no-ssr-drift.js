module.exports = {
  meta: { type: 'problem', docs: { description: 'Disallow SSR-unsafe calls in server components' } , schema: [] },
  create(context) {
    const bad = ['Date.now', 'Math.random'];
    return {
      CallExpression(node) {
        const callee = context.getSourceCode().getText(node.callee);
        if (bad.includes(callee)) {
          context.report({ node, message: `Avoid ${callee} in SSR paths (causes hydration mismatches).` });
        }
      }
    };
  }
};
