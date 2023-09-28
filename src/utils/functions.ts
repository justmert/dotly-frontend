import { encodeAddress } from '@polkadot/util-crypto';

export function formatLargeNumber(number: string | number) {
    if (typeof number === "string")   {
    const numericValue = parseFloat(number);

    const billion = 1e9; // 1 billion
    const million = 1e6; // 1 million
    const thousand = 1e3; // 1 thousand

    if (numericValue >= billion) {
      return (numericValue / billion).toFixed(1) + " B";
    } else if (numericValue >= million) {
      return (numericValue / million).toFixed(1) + " M";
    } else if (numericValue >= thousand) {
      return (numericValue / thousand).toFixed(1) + " K";
    } else {
      return numericValue.toString();
    }
  }

  else {
    const billion = 1e9; // 1 billion
    const million = 1e6; // 1 million
    const thousand = 1e3; // 1 thousand

    if (number >= billion) {
      return (number / billion).toFixed(1) + " B";
    } else if (number >= million) {
      return (number / million).toFixed(1) + " M";
    } else if (number >= thousand) {
      return (number / thousand).toFixed(1) + " K";
    } else {
      return number.toString();
    }
  }
    
}

export const formatDistanceToNow = (dateString: string) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};

export function publicKeyToAddress(publicKey: string, prefix = 0) {
  return encodeAddress(publicKey, prefix);
}