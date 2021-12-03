export const getPostDate = postCreated => {
  // use post date utc to formate posted date
  const currentDate = Date.now();
  const postDateSeconds = (currentDate / 1000) - postCreated;
  const postDateMinutes = Math.round(postDateSeconds / 60);
  const postDateHours = Math.round(postDateMinutes / 60);
  const postDateDays = Math.round(postDateHours / 24);
  const postDateMonths = Math.round(postDateDays / 30.4167);
  const postDateYears = Math.round(postDateMonths / 12);

  // return string based on posted date
  if (postDateYears > 1) {
    return `${postDateYears} years ago`;
  } else if (postDateYears === 1) {
    return `${postDateYears} year ago`;
  } else if (postDateMonths > 1) {
    return `${postDateMonths} months ago`;
  } else if (postDateMonths === 1) {
    return `${postDateMonths} month ago`;
  } else if (postDateDays > 1) {
    return `${postDateDays} days ago`;
  } else if (postDateDays === 1) {
    return `${postDateDays} day ago`;
  } else if (postDateHours > 1) {
    return `${postDateHours} hours ago`;
  } else if (postDateHours === 1) {
    return `${postDateHours} hour ago`;
  } else if (postDateMinutes > 1) {
    return `${postDateMinutes} minutes ago`;
  } else if (postDateMinutes === 1) {
    return `${postDateMinutes} minute ago`;
  } else {
    return 'less than a minute ago'
  }
};