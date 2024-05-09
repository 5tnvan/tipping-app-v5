/**
 * FUNCTION: findLatestBio()
 * RETURN: { latestBio }
 **/

export const findLatestBio = (bios: any[]) => {
  if (!Array.isArray(bios) || bios.length === 0) {
    return null; // Return null if bios array is empty or not an array
  }

  let latestBio = bios[0]; // Initialize latestBio with the first bio
  for (let i = 1; i < bios.length; i++) {
    const currentBio = bios[i];
    if (currentBio.created_at > latestBio.created_at) {
      latestBio = currentBio; // Update latestBio if currentBio is newer
    }
  }

  return latestBio;
};
