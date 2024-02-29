const generateUserSignature = (userId: string | number) => {
  // Convert user ID to string
  const userIdString = String(userId);
  const signlength = 7;

  // Calculate the number of zeros needed
  const zerosNeeded = signlength - userIdString.length;

  // Generate the signature
  const signature = '0'.repeat(zerosNeeded) + userIdString;

  return signature;
};

export default generateUserSignature;
