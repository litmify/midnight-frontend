const authMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('MIDDLEWARE');
  console.log(store.getState());

  const result = next(action);

  return result;
};

export default authMiddleware;
