const generateAvatarNames = (): string[] => {
  const avatarNames = [];
  for (let i = 1; i < 70; i += 1) {
    avatarNames.push(`avatar-${i}.svg`);
  }
  return avatarNames;
};

export { generateAvatarNames };
