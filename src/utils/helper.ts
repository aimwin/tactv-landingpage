import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const getUserRole = () => {
    const roleValue = localStorage.getItem('role');
    if (roleValue) {
      return atob(roleValue);
    }
    return roleValue;
  };

export function isFormatDate(isoDateString : any) {
    const date = new Date(isoDateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  export function formatYYMMDD(isoDateString : any) {
    const date = new Date(isoDateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }

  const formatByDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  function timeAgo(givenDateString: string) {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const duration = currentDate.getTime() - givenDate.getTime();
  
    const timeDiffInSeconds = Math.max(Math.floor(duration / 1000), 1); 
    if (timeDiffInSeconds < 60) {
      return `${timeDiffInSeconds} second${timeDiffInSeconds > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 604800) {
      const days = Math.floor(timeDiffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 2592000) {
      const weeks = Math.floor(timeDiffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 31536000) {
      const months = Math.floor(timeDiffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDiffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  export const getErrorMessage = (error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): string => {
    if (error) {
        // Check if error is a FieldError and has a message
        if ('message' in error && typeof error.message === 'string') {
            return error.message;
        }
    }
    return ''; // Return empty string if error is undefined or does not have a message
};

export const getErrorMessageArray = (error: any) => {
  if (Array.isArray(error)) {
    return error.map(e => e.message).join(', ');
  }
  return error?.message || 'Unknown error';
};



  export {
  getUserRole,
  formatByDate,
  timeAgo,
  }

