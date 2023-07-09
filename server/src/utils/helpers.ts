export const normalize = (email: string) => {
  email = email.toLowerCase();
  if (email.includes('+')) {
    const splitEmail = email.split('+');
    const splitEmail2 = splitEmail[1].split('@');
    email = splitEmail[0] + '@' + splitEmail2[1];
  }
  return email;
};
