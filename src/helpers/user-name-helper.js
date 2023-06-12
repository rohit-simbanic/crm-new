const userFullName = (user) => {
  const name = [user?.first_name ?? '', user?.last_name ?? ''];
  return name.join(' ');
};

export default userFullName;
