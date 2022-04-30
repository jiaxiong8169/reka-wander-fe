// add navigation listener to prevent back
export const preventBack = (navigation, type) => {
  navigation.addListener('beforeRemove', e => {
    console.log(e);
    if (e?.data?.action?.type === 'GO_BACK' && e.target.includes(type))
      e.preventDefault();
  });
};
