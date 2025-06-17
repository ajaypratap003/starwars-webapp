  // Helper function to extract the ID from the URL
  export const getIdFromUrl = (url: string) => {
    if (!url) return "";
    // Split the URL by "/" and filter out any empty segments
    return url.split("/").filter(Boolean).pop();
  };